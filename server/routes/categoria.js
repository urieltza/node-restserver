const express = require('express');
const { verificaToken, verificaAdmin_Role }= require ('../middlewares/autenticacion');
const categoriaControlador = require ('../controllers/categoria');
const app= express();

 // ===========================================================
 //Mostratr todas las categorias
 // ===========================================================
app.get('/categoria', verificaToken, categoriaControlador.obtenerTodo);
// ===========================================================
//  Mostrar una categoria por ID
// ===========================================================
app.get('/categoria/:id', verificaToken, categoriaControlador.obtenerPorId);

// ===========================================================
//  Crear una nueva categoria
// ===========================================================

app.post('/categoria', verificaToken, categoriaControlador.crear);

// ===========================================================
//  Actualizar una categoria (sola la descripcion)
// ===========================================================
app.put('/categoria/:id', verificaToken, categoriaControlador.actualizar);
// ===========================================================
// Borrar una categoria: 
// ===========================================================

app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], categoriaControlador.eliminar);
// 1.- solo el administrador puede borrar categorias
// Categoria

module.exports=app;