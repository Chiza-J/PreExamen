// Create a new Libro
exports.create = (req, res) => {
    let libro = {};

    try {
        // Building Libro object from request body
        libro.id_libro = req.body.id_libro;
        libro.titulo = req.body.titulo;
        libro.autor = req.body.autor;
        libro.isbn = req.body.isbn;
        libro.editorial = req.body.editorial;
        libro.anio_publicacion = req.body.anio_publicacion;
        libro.categoria = req.body.categoria;
        libro.cantidad_disponible = req.body.cantidad_disponible;
        libro.ubicacion = req.body.ubicacion;

        // Save to MySQL database
        Libros.create(libro).then(result => {
            // Send response with created Libro
            res.status(200).json({
                message: "Libro creado con éxito",
                libro: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear Libro",
            error: error.message,
        });
    }
};

// Retrieve all Libros
exports.retrieveAllLibros = (req, res) => {
    Libros.findAll()
        .then(libros => {
            res.status(200).json({
                message: "Todos los Libros obtenidos con éxito",
                libros: libros,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener Libros",
                error: error.message,
            });
        });
};

// Get a Libro by Id
exports.getLibroById = (req, res) => {
    let libroId = req.params.id;
    Libros.findByPk(libroId)
        .then(libro => {
            res.status(200).json({
                message: "Libro obtenido con éxito",
                libro: libro,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener Libro",
                error: error.message,
            });
        });
};

// Update a Libro by Id
exports.updateById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libros.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "Libro no encontrado",
                error: "404",
            });
        } else {
            let updatedObject = {
                id_libro: req.body.id_libro,
                titulo: req.body.titulo,
                autor: req.body.autor,
                isbn: req.body.isbn,
                editorial: req.body.editorial,
                anio_publicacion: req.body.anio_publicacion,
                categoria: req.body.categoria,
                cantidad_disponible: req.body.cantidad_disponible,
                ubicacion: req.body.ubicacion,
            };

            let result = await Libros.update(updatedObject, {
                returning: true,
                where: { id: libroId },
            });

            res.status(200).json({
                message: "Libro actualizado con éxito",
                libro: result[1],
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar Libro",
            error: error.message,
        });
    }
};

// Delete a Libro by Id
exports.deleteById = async (req, res) => {
    try {
        let libroId = req.params.id;
        let libro = await Libros.findByPk(libroId);

        if (!libro) {
            res.status(404).json({
                message: "Libro no encontrado",
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Libro eliminado con éxito",
                libro: libro,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar Libro",
            error: error.message,
        });
    }
};