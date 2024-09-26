module.exports = (sequelize, Sequelize) => {
    const Proyectos = sequelize.define('proyecto', {
        id_proyecto: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario: {
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.TEXT
        },
        fecha_creacion: {
            type: Sequelize.DATEONLY
        }
    });

    return Proyectos;
};