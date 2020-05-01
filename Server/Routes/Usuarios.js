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

app.get('/Usuario/SelectUsuariosAll', function(req, res) {

    connection.query('SELECT Usuario, IdUsuario, Img FROM Usuario',function(err,data)     {

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

app.post('/Usuario/SelectUsuarioByIdUser', function(req, res) {
    
    let body = req.body;
    
    connection.query(`SELECT * FROM Usuario WHERE IdUsuario = ${body.iduser}`,function(err,data)     {

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
            res.send({
                mensaje: 'No se inserto',
                icon: 'error',
                ok: false
            })           
        } else {
            res.send({
                mensaje: 'Se inserto',
                icon: 'success',
                ok: true
            })  
        }
    });
});

app.post('/Usuario/setUsuarioModificar', function(req, res) {
    
    let body = req.body;
    
    connection.query(`UPDATE Usuario SET Email = '${body.Email}',Password = '${body.Password}',Nombre = '${body.Nombre}',Apellido = '${body.Apellido}',IdTipoUsuario = ${body.TipoUsuario} WHERE  IdUsuario = ${body.iduser}`,function(err,data)     {

        if(err) {            
            res.send('no se inserto');
        } else {
            res.send('Se inserto');
        }
    });
});

app.post('/Usuario/setDeleteUsuario', function(req, res) {
    
    let body = req.body;

    connection.query(`DELETE FROM Chats_Mensajes WHERE IdUsuario = ${body.IdUsuario}`,function(err,data){});
    connection.query(`DELETE FROM Tareas WHERE IdUsuario = ${body.IdUsuario}`,function(err,data){});
    connection.query(`DELETE FROM Usuario WHERE IdUsuario = ${body.IdUsuario}`,function(err,data)     {

        if(err) {            
            res.send('no se elimino');
        } else {
            res.send('se elimino');
        }
    });
});

app.get('/Usuario/getTipoUsuario', function(req, res) {

    connection.query('SELECT * FROM TipoUsuario',function(err,data)     {

        if(err) {            
            res.send('no se seleciono nada');
        } else {
            res.json({
                Usuario:data
            });
        }
    });
});


module.exports = app;
