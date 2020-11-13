const express = require("express");
const router = express.Router();
const db = require('../models')
const clienteValidator = require('../validators/clienteValidator')

//console.log(db.Cliente, "INFOR DE DB")

router.post('/', async(req, res) => {

    // validacion de datos de entrada
    
    console.log(req.body, "BODY DE CLIENTE")
    const { error } = await clienteValidator(req.body);
    if (error) {
        console.log(error)
        return res.status(400).send({
                    status: 'error', data: `Creacion Fallida: error al llenar el campo ${error.details[0].message}`}
                )}
        
    else{
        
        //ejecucion del registro del cliente
        const {documento, nombres, mail, celular} = req.body

        await db.Cliente.create({
            documento,
            nombres,
            mail,
            celular,
        })
        .then( data => {
            console.log(data, "DATA CREATED")
            res.status(200).send({status: 'created', data})
        })
        .catch(error => {
            console.log(error, "ERROR")
            res.status(400).send({status: 'error', data: error})
        }) 
    }
})

// ruta para listar clientes para (pruebas)

router.get('/', (req, res) => {
    db.Cliente.findAll()
    .then(data => {
        console.log(data, "DATA LIST")
        res.status(200).send({status: 'list', data})
    })
    .catch(error => {
        console.log(error, "ERROR")
        res.status(400).send({status: 'error', data: error})
    })
})


module.exports = router;