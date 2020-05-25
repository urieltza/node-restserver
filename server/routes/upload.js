const express = require('express');
const fileUpload = require ('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const fs = require('fs');
const path = require('path');


// default options

app.use(fileUpload());
app.put('/upload/:tipo/:id', function (req, res){
    let tipo = req.params.tipo;
    let id = req.params.id;
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400)
            .json({
                ok:false,
                err:{
                    message: "No se ha seleccionado ningún archivo"
                }
            });
    }
    // Valida los tipos 
    let tiposValidos = ['productos', 'usuarios'];
    if(tiposValidos.indexOf( tipo) < 0 ){
        return res.status(400)
        .json({
            ok:false,
            err:{
                message: "Los tipos permitidos son: "+tiposValidos.join(' , ')
            }
        });
    }
    let data = req.files.archivo;
    let nombreCortado = data.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

     // Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    if( extensionesValidas.indexOf(extension) < 0 ){
        return res.status(400).json({
            ok:false,
            err:{
                message:"Las extensiones permitidas son: "+extensionesValidas.join(', '),
                ext:extension
            }
        });
    }

    // Cambiar nombre al archivo
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${extension}`;
    // Use the mv() method to place the file somewhere on your server
    data.mv(`uploads/${tipo}/${nombreArchivo}`, function(err) {
        if (err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(tipo=='usuarios'){
            imagenUsuario(id, res, nombreArchivo, tipo);
        }else{
            imagenProducto(id, res, nombreArchivo, tipo);
        }
    });
});

function imagenProducto(id, res, nombreArchivo, tipo){
    Producto.findById(id, (err, productoDB)=>{
        if(err) {
            borraArchivo(nombreArchivo, tipo);
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(!productoDB){
            borraArchivo(nombreArchivo, tipo);
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Producto no existe'
                }
            });
        }
        borraArchivo(productoDB.img, tipo);
        productoDB.img=nombreArchivo;
        productoDB.save( (err, productoGuardado) =>{
            res.json({
                ok:true,
                usuario:productoGuardado,
                img:nombreArchivo
            });
        });
    });    
}


function imagenUsuario(id, res, nombreArchivo, tipo){
    Usuario.findById(id, (err, usuarioDB)=>{
        if(err) {
            borraArchivo(nombreArchivo, tipo);
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(!usuarioDB){
            borraArchivo(nombreArchivo, tipo);
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuario no existe'
                }
            });
        }
        borraArchivo(usuarioDB.img, tipo);
        usuarioDB.img=nombreArchivo;
        usuarioDB.save( (err, usuarioGuardado) =>{
            res.json({
                ok:true,
                usuario:usuarioGuardado,
                img:nombreArchivo
            });
        });
    });    
}
function borraArchivo (nombreImagen, tipo) {    
    let pathImagen =  path.resolve(__dirname, `../../uploads/${tipo}/${ nombreImagen }`);
    if( fs.existsSync(pathImagen)){
        fs.unlinkSync(pathImagen);
    }
}


module.exports = app;