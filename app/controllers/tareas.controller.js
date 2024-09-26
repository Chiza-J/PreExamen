const db = require('../config/db.config.js');
const Tarea = db.Tarea;  // Asegúrate de usar la referencia correcta al modelo

// Create a new Tarea
exports.create = (req, res) => {
    let nuevaTarea = {};  // Cambié 'tarea' a 'nuevaTarea' para evitar confusión

    try {
        nuevaTarea.id_proyecto = req.body.id_proyecto;
        nuevaTarea.nombre = req.body.nombre;
        nuevaTarea.estado = req.body.estado;
        nuevaTarea.fecha_creacion = req.body.fecha_creacion;
        nuevaTarea.fecha_vencimiento = req.body.fecha_vencimiento;

        Tarea.create(nuevaTarea).then(result => {
            res.status(200).json({
                message: "Tarea creada con éxito",
                tarea: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear Tarea",
            error: error.message,
        });
    }
};

// Retrieve all Tareas
exports.retrieveAllTareas = (req, res) => {
    Tarea.findAll()
        .then(tareas => {
            res.status(200).json({
                message: "Todas las Tareas obtenidas con éxito",
                tareas: tareas,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener Tareas",
                error: error.message,
            });
        });
};

// Get a Tarea by Id
exports.getTareaById = (req, res) => {
    let tareaId = req.params.id;
    Tarea.findByPk(tareaId)
        .then(tarea => {
            res.status(200).json({
                message: "Tarea obtenida con éxito",
                tarea: tarea,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener Tarea",
                error: error.message,
            });
        });
};

// Update a Tarea by Id
exports.updateById = async (req, res) => {
    try {
        let tareaId = req.params.id;
        let tarea = await Tarea.findByPk(tareaId);

        if (!tarea) {
            res.status(404).json({
                message: "Tarea no encontrada",
                error: "404",
            });
        } else {
            let updatedObject = {
                id_proyecto: req.body.id_proyecto,
                nombre: req.body.nombre,
                estado: req.body.estado,
                fecha_creacion: req.body.fecha_creacion,
                fecha_vencimiento: req.body.fecha_vencimiento,
            };

            let result = await Tarea.update(updatedObject, {
                returning: true,
                where: { id_tarea: tareaId },
            });

            res.status(200).json({
                message: "Tarea actualizada con éxito",
                tarea: result[1],
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar Tarea",
            error: error.message,
        });
    }
};

// Delete a Tarea by Id
exports.deleteById = async (req, res) => {
    try {
        let tareaId = req.params.id;
        let tarea = await Tarea.findByPk(tareaId);

        if (!tarea) {
            res.status(404).json({
                message: "Tarea no encontrada",
                error: "404",
            });
        } else {
            await tarea.destroy();
            res.status(200).json({
                message: "Tarea eliminada con éxito",
                tarea: tarea,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar Tarea",
            error: error.message,
        });
    }
};
