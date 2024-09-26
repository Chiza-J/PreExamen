const express = require('express');
const router = express.Router();

const usuarios = require('../controllers/usuarios.controller.js');
const proyectos= require('../controllers/proyectos.controller.js');
const tareas= require('../controllers/tareas.controller.js');





// Usuarios routes
router.post('/api/usuarios/create', usuarios.create);
router.get('/api/usuarios/all', usuarios.retrieveAllUsuarios);
router.get('/api/usuarios/onebyid/:id', usuarios.getUsuarioById);
router.put('/api/usuarios/update/:id', usuarios.updateById);
router.delete('/api/usuarios/delete/:id', usuarios.deleteById);


// proyectos routes
router.post('/api/proyectos/create', proyectos.create);
router.get('/api/proyectos/all', proyectos.retrieveAllProyectos);
router.get('/api/proyectos/onebyid/:id', proyectos.getProyectoById);
router.put('/api/proyectos/update/:id', proyectos.updateById);
router.delete('/api/proyectos/delete/:id', proyectos.deleteById);

// tareas routes
router.post('/api/tareas/create', tareas.create);
router.get('/api/tareas/all', tareas.retrieveAllTareas);
router.get('/api/tareas/onebyid/:id', tareas.getTareaById);
router.put('/api/tareas/update/:id', tareas.updateById);
router.delete('/api/tareas/delete/:id', tareas.deleteById);


module.exports = router;
