const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const userRoutes = require('./routes/users');
const pollsRouter = require('./routes/polls');

const app = express()

const port = 3022
const hostname = 'localhost';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true
}));

app.use('/api/users', userRoutes);
app.use('/api/polls', pollsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`)
})