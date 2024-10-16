const db = require('../config/db.config.js');
const Servicios = db.Servicios;  // Import the Servicios model

// Create a new Servicio
exports.create = (req, res) => {
    let nuevoServicio = {};

    try {
        // Build the Servicio object from the request body
        nuevoServicio.tipo_servicio = req.body.tipo_servicio;

        // Save to the database MySQL
        Servicios.create(nuevoServicio).then(result => {
            // Send response with the created Servicio
            res.status(200).json({
                message: "Servicio creado con éxito",
                servicio: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear Servicio",
            error: error.message,
        });
    }
};

// Retrieve all Servicios
exports.retrieveAllServicios = (req, res) => {
    Servicios.findAll()
        .then(servicios => {
            res.status(200).json({
                message: "Todos los Servicios obtenidos con éxito",
                servicios: servicios,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener Servicios",
                error: error.message,
            });
        });
};

// Get a Servicio by Id
exports.getServicioById = (req, res) => {
    let servicioId = req.params.id;
    Servicios.findByPk(servicioId)
        .then(servicio => {
            if (!servicio) {
                res.status(404).json({
                    message: "Servicio no encontrado",
                });
            } else {
                res.status(200).json({
                    message: "Servicio obtenido con éxito",
                    servicio: servicio,
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener Servicio",
                error: error.message,
            });
        });
};

// Update a Servicio by Id
exports.updateById = async (req, res) => {
    try {
        let servicioId = req.params.id;
        let servicio = await Servicios.findByPk(servicioId);

        if (!servicio) {
            res.status(404).json({
                message: "Servicio no encontrado",
                error: "404",
            });
        } else {
            let updatedObject = {
                tipo_servicio: req.body.tipo_servicio,
            };

            let result = await Servicios.update(updatedObject, {
                returning: true,
                where: { id_servicio: servicioId },
            });

            res.status(200).json({
                message: "Servicio actualizado con éxito",
                servicio: result[1],
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar Servicio",
            error: error.message,
        });
    }
};

// Delete a Servicio by Id
exports.deleteById = async (req, res) => {
    try {
        let servicioId = req.params.id;
        let servicio = await Servicios.findByPk(servicioId);

        if (!servicio) {
            res.status(404).json({
                message: "Servicio no encontrado",
                error: "404",
            });
        } else {
            await servicio.destroy();
            res.status(200).json({
                message: "Servicio eliminado con éxito",
                servicio: servicio,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar Servicio",
            error: error.message,
        });
    }
};