
const express = require('express');
const app = express();
const loginControlador= require('../controllers/login');
const { verificaToken } = require('../middlewares/autenticacion');


app.post('/login', loginControlador.login); 


//Put se utiliza para actualizar registros


module.exports= app;