// Create a new Proyecto
exports.create = (req, res) => {
    let proyecto = {};
    try {
        // Building Proyecto object from request body
        proyecto.id_usuario = req.body.id_usuario;
        proyecto.nombre = req.body.nombre;
        proyecto.descripcion = req.body.descripcion;
        proyecto.fecha_creacion = req.body.fecha_creacion;

        // Save to MySQL database
        Proyectos.create(proyecto).then(result => {
            // Send response with created Proyecto
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
    Proyectos.findAll()
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
    Proyectos.findByPk(proyectoId)
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
        let proyecto = await Proyectos.findByPk(proyectoId);

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

            let result = await Proyectos.update(updatedObject, {
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
        let proyecto = await Proyectos.findByPk(proyectoId);

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