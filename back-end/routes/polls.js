const express = require('express');

const { deletePoll, getPolls, getAllPolls, patchUpdatePoll, postPolls, incrementPoll } = require('../controllers/polls');

const { authMiddleware } = require('../Middleware/Middleware');

const pollsRouter = express.Router();
pollsRouter.delete('/delete-poll', authMiddleware, deletePoll)
pollsRouter.get('/get-polls/:userId', authMiddleware, getPolls);
pollsRouter.get('/get-all-polls', getAllPolls);
pollsRouter.patch('/poll-update', authMiddleware, patchUpdatePoll);
pollsRouter.post('/post-polls', authMiddleware, postPolls);
pollsRouter.put('/put-poll', incrementPoll)
pollsRouter.use((req, res) => res.status(404).end());

module.exports = pollsRouter;