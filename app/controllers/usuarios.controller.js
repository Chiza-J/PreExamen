// Create a new Usuario
exports.create = (req, res) => {
    let usuario = {};

    try {
        // Building Usuario object from request body
        usuario.nombre = req.body.nombre;
        usuario.correo = req.body.correo;
        usuario.contrasena = req.body.contrasena;
        usuario.fecha_creacion = req.body.fecha_creacion;

        // Save to MySQL database
        Usuarios.create(usuario).then(result => {
            // Send response with created Usuario
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
    Usuarios.findAll()
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
    Usuarios.findByPk(usuarioId)
        .then(usuario => {
            res.status(200).json({
                message: "Usuario obtenido con éxito",
                usuario: usuario,
            });
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
        let usuario = await Usuarios.findByPk(usuarioId);

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

            let result = await Usuarios.update(updatedObject, {
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
        let usuario = await Usuarios.findByPk(usuarioId);

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
