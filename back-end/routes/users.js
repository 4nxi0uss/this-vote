const express = require('express');

const { getUserData, patchUserInfo, postLoginUser, postRefreshToken, postLogoutUser, patchUserTypeAccount, postSignUpUser } = require('../controllers/users');

const { authMiddleware } = require('../Middleware/Middleware');

const userRouter = express.Router();
userRouter.get('/get-user-data/:id', authMiddleware, getUserData);
userRouter.patch('/info-update', authMiddleware, patchUserInfo);
userRouter.patch('/change-account-type', authMiddleware, patchUserTypeAccount);
userRouter.post('/sign-up', postSignUpUser);
userRouter.post('/refresh-token', postRefreshToken);
userRouter.post('/login', postLoginUser);
userRouter.post('/logout', authMiddleware, postLogoutUser);
userRouter.use((req, res) => res.status(404).end());

module.exports = userRouter;