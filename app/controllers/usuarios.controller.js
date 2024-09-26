const db = require('../config/db.config.js');
const Usuario = db.Usuario;  // Asegúrate de que el modelo esté correctamente importado

// Create a new Usuario
exports.create = (req, res) => {
    let nuevoUsuario = {};  // Cambié 'usuario' a 'nuevoUsuario' para evitar confusión

    try {
        // Construir el objeto Usuario desde el cuerpo de la solicitud
        nuevoUsuario.nombre = req.body.nombre;
        nuevoUsuario.correo = req.body.correo;
        nuevoUsuario.contrasena = req.body.contrasena;
        nuevoUsuario.fecha_creacion = req.body.fecha_creacion;

        // Guardar en la base de datos MySQL
        Usuario.create(nuevoUsuario).then(result => {
            // Enviar respuesta con el Usuario creado
            res.status(200).json({
                message: "Usuario creado con éxito",
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear Usuario",
            error: error.message,
        });
    }
};

// Retrieve all Usuarios
exports.retrieveAllUsuarios = (req, res) => {
    Usuario.findAll()
        .then(usuarios => {
            res.status(200).json({
                message: "Todos los Usuarios obtenidos con éxito",
                usuarios: usuarios,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener Usuarios",
                error: error.message,
            });
        });
};

// Get a Usuario by Id
exports.getUsuarioById = (req, res) => {
    let usuarioId = req.params.id;
    Usuario.findByPk(usuarioId)
        .then(usuario => {
            if (!usuario) {
                res.status(404).json({
                    message: "Usuario no encontrado",
                });
            } else {
                res.status(200).json({
                    message: "Usuario obtenido con éxito",
                    usuario: usuario,
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener Usuario",
                error: error.message,
            });
        });
};

// Update a Usuario by Id
exports.updateById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "Usuario no encontrado",
                error: "404",
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                correo: req.body.correo,
                contrasena: req.body.contrasena,
                fecha_creacion: req.body.fecha_creacion,
            };

            let result = await Usuario.update(updatedObject, {
                returning: true,
                where: { id_usuario: usuarioId },
            });

            res.status(200).json({
                message: "Usuario actualizado con éxito",
                usuario: result[1],
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar Usuario",
            error: error.message,
        });
    }
};

// Delete a Usuario by Id
exports.deleteById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "Usuario no encontrado",
                error: "404",
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario eliminado con éxito",
                usuario: usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar Usuario",
            error: error.message,
        });
    }
};
