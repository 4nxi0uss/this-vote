const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const userRoutes = require('./routes/users');
const pollsRouter = require('./routes/polls');

const app = express()

const port = 3022
const hostname = 'thisvote.bieda.it';


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: hostname,
  credentials: true
}));

app.use('/users/api', userRoutes);
app.use('/polls/api', pollsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`)
})