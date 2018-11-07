const express = require('express');

const _ = require('underscore');

const {
    verificaToken
} = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../models/producto');


/**
 * Obtener todos los productos
 */
app.get('/productos', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({
            disponible: true
        })
        .skip(desde)
        .limit(limite)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Producto.count({
                disponible: true
            }, (err, conteo) => {
                res.json({
                    ok: true,
                    productos,
                    cuantos: conteo
                });
            });
        });

});


/**
 * Obtener un producto por id
 */
app.get('/productos/:id', (req, res) => {
    //populate: usuario y categoria
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Producto no encontrada'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });

        });

});


/**
 * Buscar productos
 */
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex})
        .populate('categoria', 'descripcion')
        .exec( (err, productos ) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            })
        });
});


/**
 * Crear un nuevo producto
 */
app.post('/productos', verificaToken, (req, res) => {
    //grabar el usuario
    //grabar una categoria del listado

    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        disponible: body.disponible,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });

});



/**
 * Actualizar un producto
 */
app.put('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'disponible', 'categoria']);

    Producto.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    }, (err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }



        res.json({
            ok: true,
            producto: productoDB
        });
    })

});


/**
 * Borrar un producto
 */
app.delete('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    let cambioEstado = {
        disponible: false
    };

    Producto.findByIdAndUpdate(id, cambioEstado, {
        new: true
    }, (err, productoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoBorrado) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoBorrado
        });

    });

});




module.exports = app;