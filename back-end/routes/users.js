const express = require('express')

const { postRegisterUser, postLoginUser, patchUserInfo, getUserData, patchActiveUser, postPolls, getPolls: getPoll, putPoll } = require('../controllers/users')

const router = express.Router();

router.patch('/infoUpdate', patchUserInfo);
router.patch('/active', patchActiveUser);
router.post('/register', postRegisterUser);
router.post('/login', postLoginUser);
router.post('/postPolls', postPolls);
router.put('/putPool', putPoll)
router.get('/getUserData/:id', getUserData);
router.get('/getPools/:creatorID', getPoll);
router.use((request, response) => response.status(404).end());

module.exports = router;