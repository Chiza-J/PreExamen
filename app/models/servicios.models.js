module.exports = (sequelize, Sequelize) => {
    const Servicios = sequelize.define('servicio', {
        id_servicio: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo_servicio: {
            type: Sequelize.STRING(255)
        },
        // Add other fields as needed
    });

    return Servicios;
};