const express = require('express');

const { getUserData, patchUserInfo, patchActiveUser, postRegisterUser, postLoginUser } = require('../controllers/users');

const { authMiddleware } = require('../Middleware/Middleware');

const userRouter = express.Router();
userRouter.get('/getUserData/:id', authMiddleware, getUserData);
userRouter.patch('/infoUpdate', authMiddleware, patchUserInfo);
userRouter.patch('/active', authMiddleware, patchActiveUser);
userRouter.post('/register', postRegisterUser);
userRouter.post('/login', postLoginUser);
userRouter.use((req, res) => res.status(404).end());

module.exports = userRouter;