
const express = require('express');
const fileUpload = require('express-fileupload');

const fs = require('fs');
const app = express();
const path = require('path');

app.use(fileUpload());


app.post('/upload/:id', (req, res) => {

    let id = req.params.id;

    if (!req.files) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No se ha seleccionado ningún archivo'
                }
            });
    }

    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
                ext: extension
            }
        })
    }

    let nombreArchivo = `${ id }.${ extension }`;

    archivo.mv(`Image/${ nombreArchivo }`, (err) => {
//        archivo.mv(`Server/Image/${ nombreArchivo }`, (err) => {

        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        res.send('Se subio el archivo');
    });

});

app.get('/imagen/:img', (req, res) => {

    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../Image/${ img }`);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        let noImagePath = path.resolve(__dirname, '../Image/default-avatar.png');
        res.sendFile(noImagePath);
    }
});

module.exports = app;
