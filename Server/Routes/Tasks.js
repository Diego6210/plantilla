const express = require('express');
const connection = require("../Mysql/Mysql");

const app = express();


app.post('/Tasks/SelectTareasByUser', function(req, res) {
    
    let body = req.body;
    
    connection.query(`SELECT *,DATE_FORMAT(Fecha,'%d/%m/%Y') as Date FROM Tareas WHERE IdUsuario  = '${body.user}'`,function(err,data)     {

        if(err) {            
            res.send('no se obtuvo resultado');
        } else {
            res.json({
                Tasks:data
            });
        }
    });
});

app.post('/Tasks/SelectTareasByID', function(req, res) {
    
    let body = req.body;
    
    connection.query(`SELECT *,DATE_FORMAT(Fecha,'%d/%m/%Y') as Date FROM Tareas WHERE IdTarea  = '${body.IdTarea}'`,function(err,data)     {

        if(err) {            
            res.send('no se obtuvo resultado');
        } else {
            res.json({
                Tasks:data
            });
        }
    });
});

app.post('/Tasks/setTareaUpdate', function(req, res) {
    
    let body = req.body;
    
    connection.query(`UPDATE Tareas SET Titulo = '${body.Titulo}',Tarea = '${body.Tarea}',Fecha = '${body.Fecha}' WHERE IdUsuario = '${body.IdUsuario}' and IdTarea = ${body.IdTarea}`,function(err,data)     {

        if(err) {            
            res.send('no se actualizo');
        } else {
            res.send('Se acutalizo');
        }
    });
});

app.post('/Tasks/setTareaChange', function(req, res) {
    
    let body = req.body;
    
    connection.query(`UPDATE Tareas SET Completado = ${body.Completado}  WHERE IdUsuario = '${body.IdUsuario}' and IdTarea = ${body.IdTarea}`,function(err,data)     {

        if(err) {            
            res.send('no se actualizo');
        } else {
            res.send('Se acutalizo');
        }
    });
});



app.post('/Tasks/setTarea', function(req, res) {
    
    let body = req.body;
    
    connection.query(`INSERT INTO Tareas(Titulo,Tarea,Fecha,Completado,IdUsuario) VALUES('${body.Titulo}','${body.Tarea}','${body.Fecha}',${body.Completado},'${body.IdUsuario}')`,function(err,data)     {

        if(err) {            
            res.send({
                mensaje:'La tarea no se asigno correctamente',
                icon:'success'
            })
        } else {
            res.send({
                mensaje:'Tarea asignada correctamente',
                icon:'success'
            });
        }
    });
});

app.post('/Tasks/setDeleteTarea', function(req, res) {
    
    let body = req.body;
    
    connection.query(`DELETE FROM Tareas WHERE IdUsuario = '${body.user}' and IdTarea = ${body.IdTarea}`,function(err,data)     {

        if(err) {            
            res.send('no se elimino');
        } else {
            res.send('se elimino');
        }
    });
});

module.exports = app;
