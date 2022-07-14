const mysql = require('mysql')

const { APP_SERVER, APP_DATABASE, APP_LOGIN, APP_PASSWORD } = process.env

module.exports = mysql.createConnection({
  host: APP_SERVER,
  user: APP_LOGIN,
  password: APP_PASSWORD,
  database: APP_DATABASE,
  dateStrings: 'date'
})