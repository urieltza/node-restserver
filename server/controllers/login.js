const bcrypt= require('bcrypt');
const Usuario= require('../models/usuario');
const jwt = require('jsonwebtoken');



module.exports = {
    login: function (req, res){
        let body=req.body;


        Usuario.findOne({email:body.email}, (err, usuarioDB)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }

            if(!usuarioDB){
                return res.status(400).json({
                    ok:false,
                    err:{
                        message:'Usuario o contraseña incorrectos'
                    }
                });
            }

            if(!bcrypt.compareSync(body.password, usuarioDB.password)){
                return res.status(400).json({
                    ok:false,
                    err:{
                        message:'Usuario o contraseña incorrectos'
                    }
                });
            }
            // Se crea el token
            console.log(process.env.CADUCIDAD_TOKEN);
            let token = jwt.sign({
                usuario:usuarioDB
            }, 'este-es-el-seed-desarrollo', {expiresIn: process.env.CADUCIDAD_TOKEN});
            res.json({
                ok:true,
                usuario:usuarioDB,
                token
            });
        });

    }
};