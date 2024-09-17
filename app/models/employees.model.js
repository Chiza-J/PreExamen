
module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define('employee',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        salario:{
            type: Sequelize.INTEGER
        },
        department:{
            type: Sequelize.STRING
        },
        copyrightby: {
            type: Sequelize.STRING,
            defaultValue: 'UMG Antigua'
        }
    });
    
    return Employee;
}