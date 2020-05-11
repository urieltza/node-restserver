
const express = require('express');
const app = express();
const UsuarioControlador= require('../controllers/usuario');

app.get('/usuario', UsuarioControlador.ObtenerTodo);
app.post('/usuario', UsuarioControlador.crear); 
app.put('/usuario/:id', UsuarioControlador.actualizar);
app.delete('/estado/:id', UsuarioControlador.cambiarEstado);
app.delete('/usuario/:id',UsuarioControlador.borrar);

//Put se utiliza para actualizar registros


module.exports= app;