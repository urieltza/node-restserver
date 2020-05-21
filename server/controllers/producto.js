let Producto = require('../models/producto');
module.exports = {
    crear: (req, res) => {
        let body=req.body;
        let producto=new Producto({
            nombre:body.nombre,
            precioUni:body.precioUni,
            descripcion:body.descripcion,
            disponible:body.disponible,
            categoria:body.categoria,
            usuario:body.usuario
        });
        console.log(producto);
        producto.save( (err , productoDB) => {
                if(err){
                    return res.json({
                        ok:false,
                        err
                    });
                }
                res.json({
                    ok:true,
                    productoDB
                });
            });
    },
    obtenerPorId: (req, res) => {
        let id=req.params.id;
        Producto.findById(id)
                .populate('usuario', 'nombre')
                .populate('categoria', 'descripcion')
                .exec((err, productoDB)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }
            if(!productoDB){
                return res.status(404).json({
                    ok:true,
                    err:{
                        message:"No existe ningun producto con ese id"
                    }
                });
            }else{
                res.json({
                    ok:true,
                    productoDB
                });
            }
        });
    },
    obtenerTodo: (req, res) =>{
        let desde =  Number(req.body.desde) || 0;
        let limite =  Number(req.body.limite) || 5;
        Producto.find({})
            .sort('nombre')
            .skip(desde)
            .limit(limite)
            .populate('usuario', {_id:0, nombre:1})
            .populate('categoria', {_id:0, descripcion:1})
            .exec( (err , productos) => {
                if(err){
                    return res.json({
                        ok:false,
                        err
                    });
                }
                res.json({
                    ok:true,
                    productos
                });
            });
    }, 
    eliminar: (req, res) => {
        let id=req.params.id;
        let estado=false;
        Producto.findByIdAndUpdate(id, {disponible:estado},{new:true}, (err, productoDB)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }
            if(!productoDB){
                return res.status(404).json({
                    ok:true,
                    err:{
                        message:"No existe ningun producto con ese id"
                    }
                });
            }else{
                res.json({
                    ok:true,
                    productoDB
                });
            }
        });
    },
    actualizar: (req, res) => {
        let id=req.params.id;
        let body=req.body;
        Producto.findByIdAndUpdate(id,body,{new:true, runValidators:true }, (err, productoDB)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }
            if(!productoDB){
                return res.status(404).json({
                    ok:true,
                    err:{
                        message:"No existe ningun producto con ese id"
                    }
                });
            }else{
                res.json({
                    ok:true,
                    productoDB
                });
            }
        });
    }, 
    buscar: (req, res)=>{
        let termino= req.params.termino;
        let regex = new RegExp(termino, 'i');
        console.log(termino);
        Producto.find({nombre:regex})
            .populate('usuario', 'nombre')
            .populate('categoria', 'descripcion')
            .exec( (err, productos)=>{
                if(err){
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                }
                res.json({
                    ok:true,
                    productos
                });
            });
    }

};