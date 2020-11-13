const express = require("express");
const bodyParser = require("body-parser");
const clienteController = require('./controllers/cliente')
const billeteraController = require('./controllers/billetera')
const cors = require("cors");
const uuid = require('uuid/v4')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const morgan = require('morgan')
const app = express();
const db = require("./models");



//configuraciones
app.use(cors({
    origin:['http://localhost:3000'],//direccion del frontend
    credentials: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'))

// ruta de prueba
app.get("/", (req, res) => {
    res.json({ message: "Working!!" });
});

// creacion de session en archivo
app.use(session({
    name:'session-id',
    secret:'123456xxx',
    saveUninitialized:false,
    resave:false,
    store:new FileStore(),
    cookie: {
        // five year cookie
        maxAge: 1000 * 60 * 60 * 24 * 365 * 5
    }
}))
app.use(cookieParser());

//rutas de trabajo
app.use('/api/cliente', clienteController)
app.use('/api/billetera', billeteraController)

//inicializacion de la db
db.sequelize.sync();

// arranque del servidor rest
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
