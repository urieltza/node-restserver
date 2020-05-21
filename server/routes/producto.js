const express = require('express');
const { verificaToken } = require ('../middlewares/autenticacion');
const productoControlador =require('../controllers/producto');

let app = express();



// ===========================================================
//  Obtener producto
// ===========================================================

app.get('/productos', verificaToken, productoControlador.obtenerTodo);
// Populate
// Paginado

// ===========================================================
//  Obtener un producto por id
// ===========================================================|
app.get('/productos/:id', verificaToken, productoControlador.obtenerPorId);

// ===========================================================
//  Crear un producto
// ===========================================================
app.post('/productos', verificaToken, productoControlador.crear);
// grabar el usuario
// grabar una categoria del listado
// ===========================================================
//  Buscar productos
// ===========================================================
app.get('/productos/buscar/:termino', verificaToken, productoControlador.buscar);



// ===========================================================
//  Actualizar un nuevo producto
// ===========================================================
app.put('/productos/:id', verificaToken, productoControlador.actualizar);

// ===========================================================
//  Borrar un producto (cambiar el estado)
// ===========================================================
app.delete('/productos/:id', verificaToken, productoControlador.eliminar);
// grabar el usuario
// grabar una categoria del listado


module.exports = app;
