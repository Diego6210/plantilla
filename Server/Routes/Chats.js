const express = require('express');
const connection = require("../Mysql/Mysql");

const app = express();


app.post('/Chat/getChatsByUser', function(req, res) {
    
    let body = req.body;
    
    connection.query(`SELECT * FROM Chats WHERE IdChats  = ${body.IdChats}`,function(err,data)     {

        if(err) {            
            res.send('no se obtuvo resultado');
        } else {
            res.json({
                Chats:data
            });
        }
    });
});

app.post('/Chat/getChatsMensajesByUser', function(req, res) {
    
    let body = req.body;
    
    connection.query(`SELECT * FROM Chats_Mensajes WHERE IdChats  = ${body.IdChats}`,function(err,data)     {

        if(err) {            
            res.send('no se obtuvo resultado');
        } else {
            res.json({
                Chats:data
            });
        }
    });
});


app.post('/Chat/getChats', function(req, res) {
    let body = req.body;
    
  /*  
SELECT c.IdChats, c.IdUsuario1,c.IdUsuario2, 
 u1.Usuario AS Usuario1,u1.Img AS Img1,u1.Nombre AS Nombre1,u1.Apellido AS Apellido1, 
 u2.Usuario AS Usuario2,u2.Img AS Img2,u2.Nombre AS Nombre2,u2.Apellido AS Apellido2
 FROM Chats c INNER JOIN Usuario As u1 ON c.IdUsuario1 = u1.IdUsuario
 INNER JOIN Usuario As u2 ON c.IdUsuario2 = u2.IdUsuario
WHERE IdUsuario1 = ${body.IdUsuario} or IdUsuario2 = ${body.IdUsuario} ORDER BY IdChats asc ;
*/
    connection.query(`SELECT c.IdChats, u1.IdUsuario AS IdUsuario1, u2.IdUsuario AS IdUsuario2,
    u1.Usuario AS Usuario1,u1.Img AS Img1,u1.Nombre AS Nombre1,u1.Apellido AS Apellido1, 
    u2.Usuario AS Usuario2,u2.Img AS Img2,u2.Nombre AS Nombre2,u2.Apellido AS Apellido2
    FROM Chats c INNER JOIN Usuario As u1 ON c.IdUsuario1 = u1.IdUsuario
    INNER JOIN Usuario As u2 ON c.IdUsuario2 = u2.IdUsuario
   WHERE IdUsuario1 = ${body.IdUsuario} or IdUsuario2 = ${body.IdUsuario} ORDER BY IdChats asc `,function(err,data)     {

        if(err) {            
            res.send('no se obtuvo resultado');
        } else {
            res.json({
                Chats:data
            });
        }
    });
});

app.post('/Chat/setChats', function(req, res) {
    
    let body = req.body;


    connection.query(`SELECT * FROM Chats WHERE IdUsuario1 = ${body.IdUsuario1} and IdUsuario2  = ${body.IdUsuario2} or IdUsuario1 = ${body.IdUsuario2} and IdUsuario2  = ${body.IdUsuario1}`,function(err,data)     {

        if(err) {            
            res.json({
                mensaje: 'No se pudo crear el chat',
                icon: 'error',
                ok: false
            })      
        } else {
            if(data.length == 0)
            {
                connection.query(`INSERT INTO Chats(IdUsuario1,IdUsuario2) VALUES(${body.IdUsuario1},${body.IdUsuario2})`,function(err,data)     {

                    if(err) {            
                        res.json({
                            mensaje: 'No se pudo crear el chat',
                            icon: 'error',
                            ok: false
                        })
                    } else {
                        res.json({
                            mensaje: 'Se creo el chat',
                            icon: 'success',
                            ok: true
                        });
                    }
                });
            }else{
                res.json({
                    Chats:data
                });
            }

        }
    });
    
});

app.post('/Chat/setChatMensaje', function(req, res) {
    
    let body = req.body;
    
    connection.query(`INSERT INTO Chats_Mensajes(Mensaje,IdChats,IdUsuario) VALUES ('${body.Mensaje}',${body.IdChats},'${body.IdUsuario}')`,function(err,data)     {

        if(err) {            
            res.send({
                mensaje: 'No se insertar',
                icon: 'error',
                ok: false
            })        
        } else {
            res.send({
                mensaje: 'Se inserto',
                icon: 'success',
                ok: true
            });
        }
    });
});

module.exports = app;
