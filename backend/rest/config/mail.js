const nodemailer = require('nodemailer')

    //confgiuracion de servicio mail trap para emular recepcion de correo

    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io", // colocar servidor smtp para enviar correo
        port: 2525,
        secure: false, 
        auth: {
            user: "f0f2f11559801e", 
            pass: "449c6c7d90fdd1" 
        }
    });

module.exports = transporter;