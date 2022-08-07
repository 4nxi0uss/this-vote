const jwt = require('jsonwebtoken')

const { APP_ACCESS_TOKEN } = process.env

const authMiddleware = (req, res, next) => {
    const token = req.cookies.JWT

    if (!token) return res.status(401).json({ message: "Token does not exist" });

    jwt.verify(token, APP_ACCESS_TOKEN, (err, data) => {

        if (err) return res.status(403).json({ message: "Wrong token" });

        req.data = data
        next()
    })
}

exports.authMiddleware = authMiddleware;