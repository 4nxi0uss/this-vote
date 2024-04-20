const mysql = require('mysql2');

const { APP_SERVER, APP_PORT, APP_DATABASE, APP_LOGIN, APP_PASSWORD } =
    process.env;

module.exports = mysql.createConnection({
    host: APP_SERVER,
    port: APP_PORT,
    user: APP_LOGIN,
    password: APP_PASSWORD,
    database: APP_DATABASE,
    dateStrings: 'date',
});
