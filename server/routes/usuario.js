
const express = require('express');
const app = express();
const UsuarioControlador= require('../controllers/usuario');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

app.get('/usuario',verificaToken,  UsuarioControlador.ObtenerTodo);
app.post('/usuario',[verificaToken, verificaAdmin_Role],  UsuarioControlador.crear); 
app.put('/usuario/:id',[verificaToken, verificaAdmin_Role],  UsuarioControlador.actualizar);
app.delete('/estado/:id',[verificaToken, verificaAdmin_Role],  UsuarioControlador.cambiarEstado);
app.delete('/usuario/:id',[verificaToken, verificaAdmin_Role], UsuarioControlador.borrar);

//Put se utiliza para actualizar registros


module.exports= app;