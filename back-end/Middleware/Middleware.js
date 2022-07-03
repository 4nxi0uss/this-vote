const jwt = require('jsonwebtoken')

const { APP_ACCESS_TOKEN } = process.env

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) (res.sendStatus(410))
    jwt.verify(token, APP_ACCESS_TOKEN, (err, data) => {
        if (err) (res.sendStatus(403));

        req.data = data
        next()
    })
}

exports.authMiddleware = authMiddleware;