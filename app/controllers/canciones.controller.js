const db = require('../config/db.config.js');
const Cancion = db.Cancion;

exports.create = (req, res) => {
    let cancion = {};

    try {
        
        cancion.nombre = req.body.nombre;
        cancion.descripcion = req.body.descripcion;
        cancion.artista = req.body.artista;
        cancion.duracion = req.body.duracion;
        cancion.extension = req.body.extension;
        cancion.album = req.body.album;
        cancion.ano = req.body.ano;
    
        
        Cancion.create(cancion).then(result => {    
            res.status(200).json({
                message: "Canción creada exitosamente con id = " + result.id,
                cancion: result,
            });
        });
    } catch(error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        let cancionId = req.params.id;
        let cancion = await Cancion.findByPk(cancionId);

        if (!cancion) {
            res.status(404).json({
                message: "No se encontró la canción con id = " + cancionId,
                cancion: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                artista: req.body.artista,
                duracion: req.body.duracion,
                extension: req.body.extension,
                album: req.body.album,
                ano: req.body.ano
            }
            let result = await Cancion.update(updatedObject, { returning: true, where: { id: cancionId } });
            
            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar la canción con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Canción actualizada exitosamente con id = " + cancionId,
                cancion: updatedObject,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error al actualizar la canción con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let cancionId = req.params.id;
        let cancion = await Cancion.findByPk(cancionId);

        if (!cancion) {
            res.status(404).json({
                message: "No existe una canción con id = " + cancionId,
                error: "404",
            });
        } else {
            await cancion.destroy();
            res.status(200).json({
                message: "Canción eliminada exitosamente con id = " + cancionId,
                cancion: cancion,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error al eliminar la canción con id = " + req.params.id,
            error: error.message,
        });
    }
}

exports.retrieveAllCanciones = (req, res) => {
    
    Cancion.findAll({
        order: [
            ['nombre', 'ASC']
        ]
    })
    .then(cancionInfos => {
        res.status(200).json({
            message: "¡Todas las canciones recuperadas exitosamente!",
            canciones: cancionInfos
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "¡Error!",
            error: error
        });
    });
}

exports.retrieveCancionesByArtist = (req, res) => {
    let artista = req.query.artista;
    
    
    Cancion.findAll({
        where: {
            artista: artista
        }
    })
    .then(cancionInfos => {
        res.status(200).json({
            message: "¡Todas las canciones del artista " + artista + " recuperadas exitosamente!",
            canciones: cancionInfos
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "¡Error!",
            error: error
        });
    });
}
