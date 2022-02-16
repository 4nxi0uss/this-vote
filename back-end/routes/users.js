const express = require('express')

const { postRegisterUser, postLoginUser, patchUserInfo,getUserData, patchActiveUser } = require('../controllers/users')

const router = express.Router();

router.post('/register', postRegisterUser);
router.post('/login', postLoginUser);
router.patch('/infoUpdate', patchUserInfo);
router.patch('/active', patchActiveUser);
router.get('/getUserData/:id', getUserData);
router.use((request, response) => response.status(404).end());


module.exports = router;