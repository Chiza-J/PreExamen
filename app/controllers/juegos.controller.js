const db = require('../config/db.config.js');
const Juego = db.Juego;  // Asegúrate de que el modelo esté correctamente importado

// Crear un nuevo Juego
exports.create = (req, res) => {
    let nuevoJuego = {};  // Cambié 'usuario' a 'nuevoJuego' para evitar confusión

    try {
        // Construir el objeto Juego desde el cuerpo de la solicitud
        nuevoJuego.ID_Juego = req.body.ID_Juego;
        nuevoJuego.Nombre_Juego = req.body.Nombre_Juego;
        nuevoJuego.Genero = req.body.Genero;
        nuevoJuego.Plataforma = req.body.Plataforma;
        nuevoJuego.Fecha_Lanzamiento = req.body.Fecha_Lanzamiento;
        nuevoJuego.Precio_Alquiler = req.body.Precio_Alquiler;
        nuevoJuego.Disponibilidad = req.body.Disponibilidad;
        nuevoJuego.Fecha_Alquiler = req.body.Fecha_Alquiler;
        nuevoJuego.Fecha_Devolucion = req.body.Fecha_Devolucion;
        nuevoJuego.Nombre_cliente = req.body.Nombre_cliente;
        nuevoJuego.Comentarios = req.body.Comentarios;

        // Guardar en la base de datos MySQL
        Juego.create(nuevoJuego).then(result => {
            // Enviar respuesta con el Juego creado
            res.status(200).json({
                message: "Juego creado con éxito",
                juego: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear Juego",
            error: error.message,
        });
    }
};

// Recuperar todos los Juegos
exports.retrieveAllJuegos = (req, res) => {
    Juego.findAll()
        .then(juegos => {
            res.status(200).json({
                message: "Todos los Juegos obtenidos con éxito",
                juegos: juegos,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener Juegos",
                error: error.message,
            });
        });
};

// Obtener un Juego por ID
exports.getJuegoById = (req, res) => {
    let juegoId = req.params.id;
    Juego.findByPk(juegoId)
        .then(juego => {
            if (!juego) {
                res.status(404).json({
                    message: "Juego no encontrado",
                });
            } else {
                res.status(200).json({
                    message: "Juego obtenido con éxito",
                    juego: juego,
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener Juego",
                error: error.message,
            });
        });
};

// Actualizar un Juego por ID
exports.updateById = async (req, res) => {
    try {
        let juegoId = req.params.id;
        let juego = await Juego.findByPk(juegoId);

        if (!juego) {
            res.status(404).json({
                message: "Juego no encontrado",
                error: "404",
            });
        } else {
            let updatedObject = {
                ID_Juego: req.body.ID_Juego,
                Nombre_Juego: req.body.Nombre_Juego,
                Genero: req.body.Genero,
                Plataforma: req.body.Plataforma,
                Fecha_Lanzamiento: req.body.Fecha_Lanzamiento,
                Precio_Alquiler: req.body.Precio_Alquiler,
                Disponibilidad: req.body.Disponibilidad,
                Fecha_Alquiler: req.body.Fecha_Alquiler,
                Fecha_Devolucion: req.body.Fecha_Devolucion,
                Nombre_cliente: req.body.Nombre_cliente,
                Comentarios: req.body.Comentarios
            };

            let result = await Juego.update(updatedObject, {
                returning: true,
                where: { ID_Juego: juegoId },
            });

            res.status(200).json({
                message: "Juego actualizado con éxito",
                juego: result[1],
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar Juego",
            error: error.message,
        });
    }
};

// Eliminar un Juego por ID
exports.deleteById = async (req, res) => {
    try {
        let juegoId = req.params.id;
        let juego = await Juego.findByPk(juegoId);

        if (!juego) {
            res.status(404).json({
                message: "Juego no encontrado",
                error: "404",
            });
        } else {
            await juego.destroy();
            res.status(200).json({
                message: "Juego eliminado con éxito",
                juego: juego,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar Juego",
            error: error.message,
        });
    }
};
