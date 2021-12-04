const express = require('express')

const { postRegisterUser, postLoginUser, patchUserInfo,getUserData } = require('../controllers/users')

const router = express.Router();

router.post('/register', postRegisterUser);
router.post('/login', postLoginUser);
router.patch('/infoUpdate', patchUserInfo);
router.get('/getUserData', getUserData);
router.use((request, response) => response.status(404).end());


module.exports = router;