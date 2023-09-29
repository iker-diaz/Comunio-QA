const {Client} = require("pg");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

//Get que devuelve el cliente de la bd de pruebas
const getClientForPrueba = () => {
    return new Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        database: process.env.DB_DATABASE_PRUEBA,
        user: process.env.DB_USER_PRUEBA,
        password: process.env.DB_PASSWORD_PRUEBA
    });
};

// Get devuelve el cliente readonly(get) a la base de datos final
const getClientForGetProd = () => {
    return new Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        database: process.env.DB_DATABASE_PROD,
        user: process.env.DB_USER_GET,
        password: process.env.DB_PASSWORD_GET
    });
};

// Get devuelve el cliente readwrite(post/patch/etc) a la base de datos final
const getClientForPostProd = () => {
    return new Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        database: process.env.DB_DATABASE_PROD,
        user: process.env.DB_USER_POST,
        password: process.env.DB_PASSWORD_POST
    });
};

module.exports = {
    getClientForPrueba,
    getClientForGetProd,
    getClientForPostProd
};