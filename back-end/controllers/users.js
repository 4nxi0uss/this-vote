const db = require('../Database/Database');

const { v4: uid } = require('uuid');

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const { APP_ACCESS_TOKEN, APP_REFRESH_TOKEN } = process.env

const APP_SALT_ROUNDS = 10;

//checking email and password in database
const checkEmail = (rows, usersEmail) => {
    return Boolean(rows.find((em) => em.email === usersEmail))
}

const checkPass = (rows, password) => {
    return bcrypt.compareSync(password, rows[0].password)
}

// register user in database
exports.postRegisterUser = (req, res) => {

    try {
        const { usersEmail: email, pass } = req.body;

        if (!Boolean(email) || !Boolean(pass)) return res.status(401)

        db.query("SELECT `email`,`password` FROM `login`", (err, rows) => {
            if (err) throw err;

            if (checkEmail(rows, email)) {
                res.status(406).json({
                    message: "User with this E-mail does exist."
                })

            } else {

                try {
                    const userId = uid();

                    bcrypt.hash(pass, APP_SALT_ROUNDS, (err, hash) => {
                        if (err) throw err

                        db.query('INSERT INTO `login` (`user_id`,`email`, `password`) VALUES ( ? , ? , ? )', [userId, email, hash], (erro, rows) => {
                            if (erro) throw erro

                            db.query("INSERT INTO `users_data` (`id`, `user_id`, `name`, `surname`, `date_of_birth`, `type_of_account`, `active`) VALUES (NULL, ? , 'John', 'Doe', '1960-01-01', '0', '0');", [userId], (error, row) => {
                                if (error) throw error

                                res.status(201).json({
                                    message: "Successfully registered new user.",
                                })
                            })
                        })
                    })
                } catch (err) {
                    res.status(401).json({
                        error: err,
                        message: "Error with registering."
                    })
                }
            }
        })

    } catch (error) {
        res.status(500).json({
            error,
            message: "Backend error with registration."

        })
    }
}

// login user 
exports.postLoginUser = (req, res) => {
    try {
        const { password, email } = req.body;

        db.query("SELECT * FROM `login` WHERE `email` = ? ", [email], (err, rows) => {
            if (err) throw err;

            if (!(checkEmail(rows, email) && checkPass(rows, password))) {

                res.status(401).json({
                    message: "Login or password is incorect.",
                    login: false,
                })

            } else {

                const payload = {
                    message: 'Logged.',
                    login: true,
                    rows: [
                        {
                            id: rows[0].id,
                            user_id: rows[0].user_id
                        }
                    ],
                }

                const accesToken = jwt.sign(payload, APP_ACCESS_TOKEN, { expiresIn: '5min' })
                const refreshToken = jwt.sign(payload, APP_REFRESH_TOKEN, { expiresIn: '1day' })

                db.query("UPDATE `login` SET `refresh_token` = ?  WHERE `login`.`user_id` = ? ", [refreshToken, rows[0].user_id], (err, rows) => {
                    if (err) throw err;
                })

                res.cookie('JWT', accesToken, {
                    maxAge: 300000,
                    httpOnly: true
                });

                res.cookie('JWT_REFRESH', refreshToken, {
                    maxAge: 30000000,
                    httpOnly: true
                });

                res.status(201).json({
                    message: 'Logged.',
                    login: true,
                    rows: [
                        {
                            id: rows[0].id,
                            user_id: rows[0].user_id
                        }
                    ],
                })
            }
        })

    } catch (err) {
        res.status(500).json({
            message: "Backend error with update user login.",
            error: err,
            login: false,
        })
    }
}

//refresh acces token
exports.postRefreshToken = (req, res) => {
    try {
        let payload = {}

        const refreshToken = req.cookies.JWT_REFRESH
        const { userId } = req.body

        if (!Boolean(userId) || !Boolean(refreshToken)) return res.status(401)

        db.query("SELECT `refresh_token` FROM `login` WHERE `user_id`= ? ", [userId], (err, rows) => {
            if (err) throw err

            try {

                if (rows[0].refresh_token === refreshToken) {

                    try {
                        jwt.verify(refreshToken, APP_REFRESH_TOKEN, (err, data) => {
                            if (err) (res.sendStatus(403));
                            payload = data;
                        })

                    } catch (error) {
                        console.warn(error)
                        return res.sendStatus(403)
                    }

                    const accesToken = jwt.sign({ message: payload.message, login: payload.login, rows: payload.rows }, APP_ACCESS_TOKEN, { expiresIn: '5min' })
                    payload = {};
                    res.cookie('JWT', accesToken, {
                        maxAge: 300000,
                        httpOnly: true
                    });

                    res.status(200).json({
                        message: "New acces token generated succesfuly",
                    })

                } else {
                    res.sendStatus(403)
                }

            } catch (error) {
                console.log('refresh error: ', error)
            }
        })

    } catch (err) {
        res.status(500).json({
            message: "Backend error with refresh token.",
            error: err
        })
    }
}

//logout
exports.postLogoutUser = (req, res) => {
    try {
        const userId = req.body.userId;

        if (!Boolean(userId)) return res.status(401)

        db.query("UPDATE `login` SET `refresh_token` = '' WHERE `login`.`user_id` = ? ", [userId], (err, rows) => {
            if (err) throw err

            res.cookie('JWT', false, {
                maxAge: 100,
                httpOnly: true
            });
            res.cookie('JWT_REFRESH', false, {
                maxAge: 100,
                httpOnly: true
            });

            res.status(200).json({
                message: "Logout succeful.",
            })
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error,
            message: "Backend error with logout.",
        })
    }
}

// add or update info about user
exports.patchUserInfo = (req, res) => {
    try {
        const { userId, name, surname, dateOfBirth } = req.body

        db.query("UPDATE `users_data` SET `Name` = ? , `Surname` = ? , `date_of_birth` = ? WHERE `users_data`.`user_id` = ? ", [name, surname, dateOfBirth, userId], (err, rows, fields) => {
            if (err) throw err;
            res.status(200).json({
                message: 'Actualization succeseed.',
                error: err
            })
        })

    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Backend error with update user info."
        })
    }
}

exports.getUserData = (req, res) => {
    try {
        const { id } = req.params

        if (!Boolean(id)) return res.status(401)

        db.query("SELECT * FROM `users_data` WHERE user_id = ? ", [id], (err, rows) => {

            if (err) throw err;

            res.status(200).json({
                message: "user data fetch succesfuly.",
                data: rows,
                error: err
            })
        })

    } catch (err) {
        res.status(500).json({
            message: "Backend error with geting user data.",
            error: err
        })
    }
}
