const jwt = require('jsonwebtoken')

const { APP_ACCESS_TOKEN } = process.env

//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) (res.sendStatus(401))

const authMiddleware = (req, res, next) => {
    const token = req.cookies.JWT

    if (!token) (res.sendStatus(401))

    jwt.verify(token, APP_ACCESS_TOKEN, (err, data) => {
        if (err) (res.sendStatus(403));

        req.data = data
        next()
    })
}

exports.authMiddleware = authMiddleware;