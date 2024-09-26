const db = require('../config/db.config.js');
const Proyecto = db.Proyecto;  // Asegúrate de usar la referencia correcta al modelo

// Create a new Proyecto
exports.create = (req, res) => {
    let nuevoProyecto = {};  // Cambié 'proyecto' a 'nuevoProyecto' para evitar confusión

    try {
        nuevoProyecto.id_usuario = req.body.id_usuario;
        nuevoProyecto.nombre = req.body.nombre;
        nuevoProyecto.descripcion = req.body.descripcion;
        nuevoProyecto.fecha_creacion = req.body.fecha_creacion;

        Proyecto.create(nuevoProyecto).then(result => {
            res.status(200).json({
                message: "Proyecto creado con éxito",
                proyecto: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear Proyecto",
            error: error.message,
        });
    }
};

// Retrieve all Proyectos
exports.retrieveAllProyectos = (req, res) => {
    Proyecto.findAll()
        .then(proyectos => {
            res.status(200).json({
                message: "Todos los Proyectos obtenidos con éxito",
                proyectos: proyectos,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener Proyectos",
                error: error.message,
            });
        });
};

// Get a Proyecto by Id
exports.getProyectoById = (req, res) => {
    let proyectoId = req.params.id;
    Proyecto.findByPk(proyectoId)
        .then(proyecto => {
            res.status(200).json({
                message: "Proyecto obtenido con éxito",
                proyecto: proyecto,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener Proyecto",
                error: error.message,
            });
        });
};

// Update a Proyecto by Id
exports.updateById = async (req, res) => {
    try {
        let proyectoId = req.params.id;
        let proyecto = await Proyecto.findByPk(proyectoId);

        if (!proyecto) {
            res.status(404).json({
                message: "Proyecto no encontrado",
                error: "404",
            });
        } else {
            let updatedObject = {
                id_usuario: req.body.id_usuario,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                fecha_creacion: req.body.fecha_creacion,
            };

            let result = await Proyecto.update(updatedObject, {
                returning: true,
                where: { id_proyecto: proyectoId },
            });

            res.status(200).json({
                message: "Proyecto actualizado con éxito",
                proyecto: result[1],
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar Proyecto",
            error: error.message,
        });
    }
};

// Delete a Proyecto by Id
exports.deleteById = async (req, res) => {
    try {
        let proyectoId = req.params.id;
        let proyecto = await Proyecto.findByPk(proyectoId);

        if (!proyecto) {
            res.status(404).json({
                message: "Proyecto no encontrado",
                error: "404",
            });
        } else {
            await proyecto.destroy();
            res.status(200).json({
                message: "Proyecto eliminado con éxito",
                proyecto: proyecto,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar Proyecto",
            error: error.message,
        });
    }
};
