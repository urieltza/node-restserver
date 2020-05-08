require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//app.use son middleware, funciones que se van disparar por cada solicitud
// parse application/json
app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/usuario', function(req, res) {
    res.json('get Usuario');
});

app.post('/usuario', function(req, res) {
    let params=req.body;
    if( params.nombre === undefined){

        res.status(400).json({
            ok:false,
            mensaje:'EL nombne es necesario'
        });
    }else{
        res.json({
            persona:params
        });
    }
});

app.put('/usuario/:id', function(req, res) {
    
    let id =req.params.id;
    res.json({
        id
    });
});

app.delete('/usuario', function(req, res) {
    res.json('delete Usuario');
});

//Put se utiliza para actualizar registros
//


app.listen(process.env.PORT,  ()=>{
    console.log('Escuchando puerto: '+process.env.PORT);
});