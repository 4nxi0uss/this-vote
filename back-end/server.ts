const express = require('express')
const db = require('../back-end/Database/Database')

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

db.connect()

db.query('SELECT * FROM `pks` ORDER BY `godz_odj` ASC', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0])
  // console.log('The solution is: ', rows[0].solution)
})

db.end()