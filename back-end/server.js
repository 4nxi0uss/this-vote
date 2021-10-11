const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const db = require('./Database/Database')

const app = express()
const port = 3022

app.use(bodyParser.json());
app.use(cors());

const nowDate = new Date().getHours()
console.log(nowDate)
console.log(nowDate+1)

db.connect()
app.get('/get', (req, res) => {
  try{

    db.query(`SELECT * FROM pks WHERE departure_time  BETWEEN '${nowDate-1}:59' AND '${nowDate+1}:01'`, function (error, rows, fields) {
  if (error) throw error

  res.status(200).json({rows,fields})
  
})

}catch(error){
  res.status(500).json({
    error,
    message: 'Oops! Coś poszło nie tak',
  })
}
})
// db.end()

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})