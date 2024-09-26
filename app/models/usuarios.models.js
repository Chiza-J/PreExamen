module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define('usuario', {
        id_usuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        },
        contrasena: {
            type: Sequelize.STRING
        },
        fecha_creacion: {
            type: Sequelize.DATEONLY
        }
    });

    return Usuarios;
};