const mysql = require('mysql')
module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'express',
  password: '123456',
  database: 'pls',
  // debug: false,
})

