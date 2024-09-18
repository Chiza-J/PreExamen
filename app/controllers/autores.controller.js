
// Autores controller
const Autores = require('../models/autores.model.js');

// Create a new Autor
exports.create = (req, res) => {
    let autor = {};

    try {
        // Building Autor object from request body
        autor.nombre = req.body.nombre;
        autor.apellido = req.body.apellido;
        autor.nacionalidad = req.body.nacionalidad;
        autor.fecha_nacimiento = req.body.fecha_nacimiento;

        // Save to MySQL database
        Autores.create(autor).then(result => {
            // Send response with created Autor
            res.status(200).json({
                message: "Autor creado con éxito",
                autor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear Autor",
            error: error.message,
        });
    }
};

// Retrieve all Autores
exports.retrieveAllAutores = (req, res) => {
    Autores.findAll()
        .then(autores => {
            res.status(200).json({
                message: "Todos los Autores obtenidos con éxito",
                autores: autores,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener Autores",
                error: error.message,
            });
        });
};

// Get a Autor by Id
exports.getAutorById = (req, res) => {
    let autorId = req.params.id;
    Autores.findByPk(autorId)
        .then(autor => {
            res.status(200).json({
                message: "Autor obtenido con éxito",
                autor: autor,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener Autor",
                error: error.message,
            });
        });
};

// Update a Autor by Id
exports.updateById = async (req, res) => {
    try {
        let autorId = req.params.id;
        let autor = await Autores.findByPk(autorId);

        if (!autor) {
            res.status(404).json({
                message: "Autor no encontrado",
                error: "404",
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nacionalidad: req.body.nacionalidad,
                fecha_nacimiento: req.body.fecha_nacimiento,
            };

            let result = await Autores.update(updatedObject, {
                returning: true,
                where: { id: autorId },
            });

            res.status(200).json({
                message: "Autor actualizado con éxito",
                autor: result[1],
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar Autor",
            error: error.message,
        });
    }
};

// Delete a Autor by Id
exports.deleteById = async (req, res) => {
    try {
        let autorId = req.params.id;
        let autor = await Autores.findByPk(autorId);

        if (!autor) {
            res.status(404).json({
                message: "Autor no encontrado",
                error: "404",
            });
        } else {
            await autor.destroy();
            res.status(200).json({
                message: "Autor eliminado con éxito",
                autor: autor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar Autor",
            error: error.message,
        });
    }
};