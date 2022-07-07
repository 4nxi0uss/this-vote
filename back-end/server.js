const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')

const userRoutes = require('./routes/users');
const pollsRouter = require('./routes/polls');

const app = express()

const port = 3022
const hostname = 'localhost';


app.use(bodyParser.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/polls', pollsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`)
})