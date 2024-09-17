
module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define('usuario',{
        id_usuario:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        telefono:{
            type: Sequelize.INTEGER
        },
        direccion:{
            type: Sequelize.STRING
        },
        fecha_registro:{
            type: Sequelize.DATEONLY
        },
        estado: {
            type: Sequelize.STRING
        }
    });
    
    return Usuarios;
}