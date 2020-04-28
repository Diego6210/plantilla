const express = require('express');
const connection = require("../Mysql/Mysql");

const app = express();

app.get('/Usuario/SelectUsuario', function(req, res) {

    connection.query('SELECT * FROM Usuario',function(err,data)     {

        if(err) {            
            res.send('no se seleciono nada');
        } else {
            res.json({
                Usuario:data
            });
        }
    });
});

app.post('/Usuario/SelectUsuarioByUser', function(req, res) {
    
    let body = req.body;
    
    connection.query(`SELECT * FROM Usuario WHERE Usuario = '${body.user}'`,function(err,data)     {

        if(err) {            
            res.send('no se obtuvo resultado');
        } else {
            res.json({
                Usuario:data
            });
        }
    });
});

app.post('/Usuario/setImagen', function(req, res) {
    
    let body = req.body;
    //res.send('select usuario');
    connection.query(`UPDATE Usuario SET Img = '${body.Img}' WHERE Usuario = '${body.user}'`,function(err,data)     {

        if(err) {            
            res.send('no se cambio');
        } else {
            res.send('Se cambio');
        }
    });
});


app.post('/Usuario/setUsuario', function(req, res) {
    
    let body = req.body;
    
    connection.query(`INSERT INTO Usuario(Usuario,Email,Password,Nombre,Apellido,IdTipoUsuario) VALUES('${body.Usuario}','${body.Email}','${body.Password}','${body.Nombre}','${body.Apellido}',${body.TipoUsuario})`,function(err,data)     {

        if(err) {            
            res.send('no se inserto');
        } else {
            res.send('Se inserto');
        }
    });
});

app.post('/Usuario/setDeleteUsuario', function(req, res) {
    
    let body = req.body;
    
    connection.query(`SELECT * FROM Usuario WHERE Usuario = '${body.user}'`,function(err,data)     {

        if(err) {            
            res.send('no se obtuvo resultado');
        } else {
            res.send('se elimino');
        }
    });
});


module.exports = app;
