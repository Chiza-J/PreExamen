module.exports = (sequelize, Sequelize) => {
    const Tareas = sequelize.define('tarea', {
        id_tarea: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_proyecto: {
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.STRING
        },
        fecha_creacion: {
            type: Sequelize.DATEONLY
        },
        fecha_vencimiento: {
            type: Sequelize.DATEONLY
        }
    });

    return Tareas;
};