const env = {
    database: 'examen2_vkbi',
    username: 'examen2_vkbi_user',
    password: 'R8vK7zbuPEeOMX03uzQbL6QdeoTnAQOl',
    host: 'dpg-crqag0aj1k6c738dnkk0-a.oregon-postgres.render.com',
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
