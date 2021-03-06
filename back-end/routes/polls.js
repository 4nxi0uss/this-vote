const express = require('express');

const { deletePoll, getPolls, getAllPolls, patchUpdatePoll, postPolls, incrementPoll } = require('../controllers/polls');

const { authMiddleware } = require('../Middleware/Middleware');

const pollsRouter = express.Router();
pollsRouter.delete('/deletePoll', authMiddleware, deletePoll)
pollsRouter.get('/getPolls/:userId', authMiddleware, getPolls);
pollsRouter.get('/getAllPolls', getAllPolls);
pollsRouter.patch('/pollUpdate', authMiddleware, patchUpdatePoll);
pollsRouter.post('/postPolls', authMiddleware, postPolls);
pollsRouter.put('/putPoll', incrementPoll)
pollsRouter.use((req, res) => res.status(404).end());

module.exports = pollsRouter;