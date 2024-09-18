module.exports = (sequelize, Sequelize) => {
    const Libros = sequelize.define('libro', {
        id_libro: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: Sequelize.STRING
        },
        autor: {
            type: Sequelize.STRING
        },
        isbn: {
            type: Sequelize.STRING
        },
        editorial: {
            type: Sequelize.STRING
        },
        anio_publicacion: {
            type: Sequelize.DATEONLY
        },
        categoria: {
            type: Sequelize.STRING
        },
        cantidad_disponible: {
            type: Sequelize.INTEGER
        },
        ubicacion: {
            type: Sequelize.STRING
        }
    });

    return Libros;
};