const express = require("express");
const router = express.Router();
const db = require('../models')
const uuid = require('uuid/v4');
const transporter = require('../config/mail')
const  { QueryTypes } = require('sequelize')

//console.log(db.Billetera, "INFOR DE DB")

router.post('/recarga/', async(req, res) =>
{
    // validacion datos de entrada
    
    const {documento, celular, recarga} = req.body
    if(!documento && !celular && !recarga) res.status(400).send(
        {status: 'error', data: 'para recargar se necesita No documento, No celular y saldo a recargar'})

        await db.sequelize.query(
        'update Billeteras inner join Clientes on  Billeteras.ClienteId = Clientes.id set saldo= (saldo + :recarga) where Clientes.documento = :documento and Clientes.celular = :celular;',
        {
            replacements: { recarga, documento, celular  },
            mapToModel: true,
            type: QueryTypes.UPDATE
        }
    )
        .then( data => {
            console.log(data[1], "BILLETERA RECARGADA")
            if(data[1] === 0) res.status(404).send({status: 'error', data: 'no se encontro billetera con esos datos'})
            res.status(200).send({status: 'exito', data: `recarga de ${recarga} realizada con exito` })
        })
        .catch(error => {
            console.log(error, "ERROR")
            res.status(400).send({status: 'error', data: error})
        })     
})

router.post('/', async(req, res) => {

    // validacion datos de entrada

    const {documento, celular} = req.body
    console.log(documento, celular, "BODY BILLETERA")
    if(!documento && !celular) res.status(400).send(
        {status: 'error', data: 'para consultar se necesita No documento y No celular'})

    // consulta a billetera    

    await db.Billetera.findOne({
        include: {
            model: db.Cliente,
            where: {
                documento,
                celular
            }
        }
    })
    
    .then(data => {
        console.log(data, "DATA Billetera")
        if(!data) res.status(404).send({status: 'error', data: 'no se encontro billetera '})
        res.status(200).send({status: 'list', data})
    })
    .catch(error => {
        console.log(error, "ERROR")
        res.status(404).send({status: 'error', data: error})
    })
})

router.post('/pagar/', async(req, res, next) => {
    
    const {documento, celular, saldo, monto_pago, mail} = req.body
    
    //agregar datos de entrada para guradar en session
    req.session.monto_pago = parseInt(monto_pago)

    console.log(req.session.id, "SESSION ID")
    console.log(parseInt(monto_pago), parseInt(saldo), "VALORES DEL SALDO")
    console.log(typeof(monto_pago), typeof(saldo), "TIPS  DE VALORES DEL SALDO")

    //validacion datos de entrada

    if(!documento || !celular || !saldo || !monto_pago || !mail) res.status(400).send(
        {status: 'error', data: 'para pagar se necesita No documento, No celular, saldo, y monto a pagar a recargar'})
    
    if(parseInt(monto_pago) > parseInt(saldo)) {
        res.status(400).send(
        {status: 'error', data: 'no dispone suficiente saldo para realizar este pago'})
    }
    
        const generaToken = () => { 
        
            let digits = '0123456789'; 
            let token = '';
            let length = 6
            for (let i = 0; i < length; i++ ) { 
                token += digits[Math.floor(Math.random() * 10)]; 
            } 
            return token; 
        } 

    // genera y guarda token en sesion
    const token = generaToken()
    console.log(token, "TOKEN GENERADO")
    req.session.token = token

    // actualiza la tabla billetera con el token generado para que luego pueda ser confirmado el pago
    await db.sequelize.query(
        'update Billeteras inner join Clientes on  Billeteras.ClienteId = Clientes.id set confirma_token = :token  where Clientes.documento = :documento and Clientes.celular = :celular;',
        {
            replacements: { token, documento, celular  },
            mapToModel: true,
            type: QueryTypes.UPDATE
        }
    )
        .then( data => {
            console.log(data[1], "ACTUALIZADO TOKEN")
            if(data[1] === 0) res.status(404).send({status: 'error', data: 'error al cargar el token'})
            //res.status(200).send({status: 'exito', data: `recarga de ${saldo} realizada con exito` })
        })
        .catch(error => {
            console.log(error, "ERROR")
            res.status(400).send({status: 'error', data: error})
        })     


    var mailOptions = {
        from: '"Example Team" <from@example.com>',
        to: mail,
        subject: 'Confirmacion de Pago',
        text: 'Se han enviado la siguiente informacion', 
        html: `<b>Informacion para confirmacion de su pago! </b><br> Token: ${token}<br>Sesion:${req.session.id}`
    };

    // envia el correo con la informacion de mail i id de session
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        //res.status(200).send({status: 'pendiente', data: {token, session: req.session.id}})
        res.status(200).send({status: 'pendiente', data: `Se ha enviado al correo ${mail} la informacion para confirmar pago`})
});
    
    console.log(req.session, "DATOS DE SESION")

})

router.post('/confirmar/', async(req, res, next) => {

    const {token} = req.body
    
    console.log(req.session, "DATOS DE SESSION")
    
    //toma los datos de la session y los compara
    const {monto_pago} = req.session
    console.log(token, req.session.token, monto_pago, "DATOS dESDE SESSION")
    if(!token) {
        res.status(400).send({status: 'error', data: 'no se recibio el token de forma correcta'})
    }
    if(token !== Number(req.session.token) || monto_pago === undefined) {
        res.status(400).send({status: 'error', data: 'token invalido o expirado'})
    }
    else {

    // si hay coincidencia entonces descuenta la cantidad guardada en session con el token 
        await db.Billetera.decrement(
            'saldo', 
            {by: monto_pago, where: {
                confirma_token: token
            }})
        .then( data => {
            console.log(data, "SE EJECUTO EL PAGO")
            if(data[1] === 0) res.status(404).send({status: 'error', data: 'error al cargar hacer descuento'})
            res.status(200).send({status: 'exito', data: `confirmacion se ha descontado ${monto_pago} de su billetera` })

            // en caso de exito destruye la session para fines de seguridad
            req.session.destroy(function(err) {
                if(err) {
                    return next(err);
                } else {
                    req.session = '';
                    console.log("CONFIRMACION DE PAGO EXITOSA");
                    //return res.redirect('/');
                }
            })
            
        })
        .catch(error => {
            console.log(error, "ERROR")
            res.status(400).send({status: 'error', data: error})
        })
    }     

})



module.exports = router;