const env = {
    database: 'examenfinal_52jk',
    username: 'examenfinal_52jk_user',
    password: 'oAAfxxg4BCbolo2ueJ0uAvNGlzT7vvUY',
    host: 'dpg-cslseibtq21c73duefpg-a.oregon-postgres.render.com',
    port: '5432',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;
