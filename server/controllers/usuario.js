const bcrypt= require('bcrypt');
const _ = require('underscore');//NOS AYUDA A PROCESAR
//UNA UN OBJETO Y SELECCIONAR QUE PROPIEDADES QUEREMOS QUE SEAN 
//MOSTRADAS
const Usuario= require('../models/usuario');
module.exports={
    ObtenerTodo: function (req, res){
        let desde = Number(req.query.desde) || 0;
        let limite = Number(req.query.limite) || 5;
        Usuario.find({'state':true},'nombre email role state google img')
                .skip(desde)
                .limit(limite)
                .exec( (err, usuarios) =>{
                    if(err){
                        return  res.status(400).json({
                            ok:false,
                            err
                        });
                    }
                    Usuario.count({'state':true}, (err, conteo) => {
                        res.json({
                            ok:true,
                            usuarios,
                            conteo
                    });
                    });
                });
    },
    crear: function(req, res){
        let params=req.body;
        const salt=10;
        let usuario=new Usuario({
            nombre:params.nombre,
            email:params.email,
            password: bcrypt.hashSync( params.password,salt),
            role:params.role
        });
        usuario.save( (err, usuarioDB) =>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            res.json({
                ok:true,
                usuario:usuarioDB
            });
        });
    },
    actualizar: function (req, res){
        let id =req.params.id;
        let body=_.pick(req.body, ['nombre','email','img','role','estado']);

        Usuario.findByIdAndUpdate(id, body, {new:true, runValidators:true, context:'query'},(err, usuarioDB)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            res.json({
                ok:true,
                usuario:usuarioDB
            });
        });
    },
    cambiarEstado:function(req, res) {
        let id =req.params.id;
        let state=req.body.state;
        Usuario.findOneAndUpdate(id, {$set:{state:state}}, {new:true},(err, usuarioDB)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            res.json({
                ok:true,
                usuario:usuarioDB
            });
        });
    },
    borrar: function(req,res){
        let id=req.params.id;
        Usuario.findByIdAndDelete(id, (err, usuarioBorrado)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            if(!usuarioBorrado){
                return res.status(400).json({
                    ok:false,
                    err:{
                        message:'Usuario no encontrado'
                    }
                });
            }
            res.json({
                ok:true,
                usuario:usuarioBorrado
            });
        });
    }
    
};

//Put se utiliza para actualizar registros
