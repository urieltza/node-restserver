const mongoose = require('mongoose');

let Categoria = require ('../models/categoria');
let Usuario = require ('../models/usuario');




module.exports = {
    obtenerTodo: (req, res)=>{
        let desde = Number(req.query.desde) || 0;
        let limite = Number(req.query.limite) || 5;
        Categoria.find({})
            .sort('descripcion')
            .skip(desde)
            .limit(limite)
            .populate('usuario', 'nombre email')
            .exec((err, categoriaDB) =>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }
            Categoria.countDocuments((err, total)=>{
                if(err){
                    return res.status(500).json({
                        ok:false,
                        err
                    });
                }else{
                    res.json({
                        ok:true,
                        categoriaDB,
                        total
                    });
                }
            });
        });
    },
    obtenerPorId: (req, res)=>{
        let id=req.params.id;
        Categoria.findById(id, (err, categoriaDB)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }
            res.json({
                ok:true,
                categoriaDB,
            });
        });
    },
    crear:(req, res) =>{

        let categoria=new Categoria();
        let idUsuario=req.usuario._id;
        let body = req.body;
        categoria.descripcion=body.descripcion;
        categoria.usuario=idUsuario;
        categoria.save((err, categoriaDB)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }else{
                res.json({
                    ok:true,
                    categoriaDB
                });
            }
        });

    },
    actualizar:  (req, res) =>{
        const id=req.params.id;
        const body=req.body;
        Categoria.findByIdAndUpdate(id, body, {new:true, runValidators:true})
            .populate('usuario', 'nombre, email')
            .exec((err, categoriaDB) =>{
                    if(err){
                        return res.status(500).json({
                            ok:false,
                            err
                        });
                    }
                    if(!categoriaDB){
                        return res.status(500).json({
                            ok:false,
                            err:{
                                message:"No existe el elemento",
                                err
                            }
                        });
                    }else{
                            res.json({
                                ok:true,
                                categoriaDB
                            });
                    }
        });
    },
    eliminar:(req, res)=>{
        const id=req.params.id;
        Categoria.findByIdAndDelete(id, (err, categoriaEliminada)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }
            if(!categoriaEliminada){
                return res.status(400).json({
                    ok:false,
                    err:{
                        message:"No existe el elemento",
                    }
                });
            }
            res.json({
                categoriaEliminada
            });
        });        
    }
};