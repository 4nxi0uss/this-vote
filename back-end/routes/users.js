const express = require('express');

const { incrementPoll } = require('../controllers/function');

const { postRegisterUser, postLoginUser, patchUserInfo, getUserData, patchActiveUser, postPolls, getPolls, deletePoll, getAllPolls } = require('../controllers/users')

const router = express.Router();
router.delete('/deletePoll', deletePoll)
router.patch('/infoUpdate', patchUserInfo);
router.patch('/active', patchActiveUser);
router.post('/register', postRegisterUser);
router.post('/login', postLoginUser);
router.post('/postPolls', postPolls);
router.put('/putPoll', incrementPoll)
router.get('/getUserData/:id', getUserData);
router.get('/getPolls/:creatorId', getPolls);
router.get('/getAllPolls', getAllPolls);
router.use((req, res) => res.status(404).end());

module.exports = router;