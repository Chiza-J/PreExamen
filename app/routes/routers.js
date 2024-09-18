const express = require('express');
const router = express.Router();

const usuarios = require('../controllers/usuarios.controller.js');
const libros = require('../controllers/libros.controller.js');



// Usuarios routes
router.post('/api/usuarios/create', usuarios.create);
router.get('/api/usuarios/all', usuarios.retrieveAllUsuarios);
router.get('/api/usuarios/onebyid/:id', usuarios.getUsuarioById);
router.put('/api/usuarios/update/:id', usuarios.updateById);
router.delete('/api/usuarios/delete/:id', usuarios.deleteById);


// Libros routes
router.post('/api/libros/create', libros.create);
router.get('/api/libros/all', libros.retrieveAllLibros);
router.get('/api/libros/onebyid/:id', libros.getLibroById);
router.put('/api/libros/update/:id', libros.updateById);
router.delete('/api/libros/delete/:id', libros.deleteById)

module.exports = router;
