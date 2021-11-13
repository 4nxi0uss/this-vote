const express = require('express')

const { postRegisterUser,postLoginUser } = require('../controllers/users')

const router = express.Router();

router.post('/register', postRegisterUser);
router.post('/login', postLoginUser);
router.use((request, response) => response.status(404).end());


module.exports = router;