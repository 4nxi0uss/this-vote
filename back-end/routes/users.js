const express = require('express');

const { getUserData, patchUserInfo, patchActiveUser, postRegisterUser, postLoginUser } = require('../controllers/users')

const userRouter = express.Router();
userRouter.get('/getUserData/:id', getUserData);
userRouter.patch('/infoUpdate', patchUserInfo);
userRouter.patch('/active', patchActiveUser);
userRouter.post('/register', postRegisterUser);
userRouter.post('/login', postLoginUser);
userRouter.use((req, res) => res.status(404).end());

module.exports = userRouter;