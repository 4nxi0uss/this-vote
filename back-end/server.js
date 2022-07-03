const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express()

const port = 3022
const hostname = 'localhost';

const userRoutes = require('./routes/users')

app.use(bodyParser.json());
app.use(cors());

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`)
})