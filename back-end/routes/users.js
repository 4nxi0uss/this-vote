const express = require('express')

const { postRegisterUser,postLoginUser } = require('../controllers/users')

const router = express.Router();

router.post('/register', postRegisterUser);
router.post('/login', postLoginUser);


module.exports = router;