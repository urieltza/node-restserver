
const express = require('express');
const app = express();
const loginControlador= require('../controllers/login');
const { verificaToken } = require('../middlewares/autenticacion');


app.post('/login', loginControlador.login);
app.post('/google', loginControlador.google);


//Put se utiliza para actualizar registros


module.exports= app;