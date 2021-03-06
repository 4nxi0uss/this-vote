const express = require('express');

const { getUserData, patchUserInfo, patchActiveUser, postRegisterUser, postLoginUser, postRefreshToken, postLogoutUser } = require('../controllers/users');

const { authMiddleware } = require('../Middleware/Middleware');

const userRouter = express.Router();
userRouter.get('/getUserData/:id', authMiddleware, getUserData);
userRouter.patch('/infoUpdate', authMiddleware, patchUserInfo);
userRouter.patch('/active', authMiddleware, patchActiveUser);
userRouter.post('/register', postRegisterUser);
userRouter.post('/refreshToken', postRefreshToken);
userRouter.post('/login', postLoginUser);
userRouter.post('/logout', authMiddleware, postLogoutUser);
userRouter.use((req, res) => res.status(404).end());

module.exports = userRouter;