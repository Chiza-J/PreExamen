module.exports = (sequelize, Sequelize) => {
    const Juego = sequelize.define('Juego', {
        ID_Juego: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        Nombre_Juego: {
            type: Sequelize.STRING
        },
        Genero: {
            type: Sequelize.STRING
        },
        Plataforma: {
            type: Sequelize.STRING
        },
        Fecha_Lanzamiento: {
            type: Sequelize.DATEONLY
        },
        Precio_Alquiler: {
            type: Sequelize.DECIMAL
        },
        Disponibilidad: {
            type: Sequelize.BOOLEAN
        },
        Fecha_Alquiler: {
            type: Sequelize.DATEONLY
        },
        Fecha_Devolucion: {
            type: Sequelize.DATEONLY
        },
        Nombre_cliente: {
            type: Sequelize.STRING
        },
        Comentarios: {
            type: Sequelize.TEXT
        }
    });

    return Juego;
};
