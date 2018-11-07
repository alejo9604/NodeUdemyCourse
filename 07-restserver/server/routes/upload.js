const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const fs = require('fs');
const path = require('path');

// default options
app.use(fileUpload());

app.put('/upload/:tipo/:id', function (req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo'
            }
        });
    }


    //Validar tipo
    let tiposValidos = ['productos', 'usuarios'];

    if(tiposValidos.indexOf(tipo) < 0 ){
        return res.status(400).json({
            ok: false,
            err:{
                message: 'Los tipos permitidas son ' + tiposValidos.join(', '),
                tipo
            }
        });
    }


    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    //Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if(extensionesValidas.indexOf( extension ) < 0){
        return res.status(400).json({
            ok: false,
            err:{
                message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
                ext: extension
            }
        });
    }
    


    //Cambiar nombre al archivo
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extension }`;

    
    archivo.mv(`uploads/${ tipo }/${ nombreArchivo }`, (err) => {
        if (err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(tipo === 'usuarios')
            ImagenUsuario(id, res, nombreArchivo);
        else if(tipo === 'productos')
            ImagenProducto(id, res, nombreArchivo);

    });

});


function ImagenUsuario(id, res, nombreArchivo){

    Usuario.findById(id, (err, usuarioDB) => {

        if(err){

            BorraArchivo(nombreArchivo, 'usuarios');

            return res.status(500).json({
                ok: false,
                err
            });
        }


        if(!usuarioDB){

            BorraArchivo(nombreArchivo, 'usuarios');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });
        }

        BorraArchivo(usuarioDB.img, 'usuarios');

        usuarioDB.img = nombreArchivo;
        usuarioDB.save( (err, usuarioGuardado) => {

            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            });

        });


    });
}


function ImagenProducto(id, res, nombreArchivo){

    Producto.findById(id, (err, productoDB) => {

        if(err){

            BorraArchivo(nombreArchivo, 'productos');

            return res.status(500).json({
                ok: false,
                err
            });
        }


        if(!productoDB){

            BorraArchivo(nombreArchivo, 'productos');

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no existe'
                }
            });
        }

        BorraArchivo(productoDB.img, 'productos');

        productoDB.img = nombreArchivo;
        productoDB.save( (err, productoGuardado) => {

            res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreArchivo
            });

        });


    });


}


function BorraArchivo(nombreImagen, tipo){
    let pathImagen = path.resolve( __dirname, `../../uploads/${ tipo }/${ nombreImagen }` );
    if( fs.existsSync( pathImagen ) ){
        fs.unlinkSync( pathImagen );
    }

}

module.exports = app;