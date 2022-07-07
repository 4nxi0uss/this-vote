const db = require('../Database/Database');

const { v4: uid } = require('uuid');

const jwt = require('jsonwebtoken')

const { APP_ACCESS_TOKEN, APP_REFRESH_TOKEN } = process.env

//checking email and password in database
const checkEmail = (rows, usersEmail) => {
    return Boolean(rows.find((em) => em.email === usersEmail))
}

const checkPass = (rows, password) => {
    return Boolean(rows.find((pas) => pas.password === password))
}

// register user in database
exports.postRegisterUser = (req, res) => {

    try {
        const { usersEmail: email, pass } = req.body;

        db.query("SELECT `email`,`password` FROM `login`", (err, rows) => {
            if (err) throw err;

            if (checkEmail(rows, email)) {
                res.status(406).json({
                    message: "User with this E-mail does not exist."
                })

            } else {
                db.query('INSERT INTO `login` (`user_id`,`email`, `password`) VALUES ("' + uid() + '", "' + email + '", "' + pass + '");', (err, rows) => {

                    try {
                        res.status(201).json({
                            message: "Successfully registered new user.",
                            error: err,
                            data: rows
                        })

                    } catch (err) {
                        res.status(402).json({
                            err,
                            message: "Error with registering."
                        })
                    }
                });
            }
        })

    } catch (error) {
        res.status(500).json({
            error,
            message: "Backend error with registration."

        })
    }
}

let fakeDatabase = [
]

// login user 
exports.postLoginUser = (req, res) => {

    try {
        const { password, email } = req.body;

        db.query("SELECT * FROM `login` WHERE `email` = '" + email + "' AND `password` = '" + password + "' ", (err, rows) => {
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
                    rows: rows,
                }

                const token = jwt.sign(payload, APP_ACCESS_TOKEN)
                // const token = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: '15m', })
                const refreshToken = jwt.sign(payload, APP_REFRESH_TOKEN)
                fakeDatabase.push(refreshToken);

                res.status(201).json({
                    message: 'Logged.',
                    login: true,
                    rows: rows,
                    token,
                    refreshToken,
                })
            }
        })

    } catch (err) {
        res.status(500).json({
            error: "Backend error with update user login.",
            login: false,
        })
    }
}

// add or update info about user
exports.patchUserInfo = (req, res) => {
    try {
        const { userId, name, surname, dateOfBirth } = req.body

        db.query("SELECT user_id FROM `users_data`", (err, rows) => {
            if (err) throw err;
            const userIdFinder = rows.some(id => id.user_id === userId);

            if (!Boolean(`${userIdFinder}`)) {
                db.query("INSERT INTO `users_data` (`user_id`, `Name`, `Surname`, `date_of_birth`, `type_of_account`, `active`, `polls`) VALUES ('" + userId + "', '" + name + "', '" + surname + "', '" + dateOfBirth + "', '0', '0', '[]')", (err, rows) => {
                    if (err) throw err;
                    res.status(200).json({
                        message: 'Actualization and adding new information was succeeded.',
                        rows: rows,
                        error: err,
                    })
                })

            } else {
                db.query("UPDATE `users_data` SET `Name` = '" + name + "', `Surname` = '" + surname + "', `date_of_birth` = '" + dateOfBirth + "' WHERE `users_data`.`user_id` ='" + userId + "'", (err, rows, fields) => {
                    if (err) throw err;
                    res.status(200).json({
                        message: 'Actualization succeseed.',
                        rows: rows,
                        error: err
                    })
                })
            }
        })
    } catch (err) {

        res.status(500).json({
            error: err,
            message: "Backend error with update user info."
        })
    }
}

exports.patchActiveUser = (req, res) => {
    try {
        const { userId } = req.body
        db.query("SELECT user_id, `active` FROM `users_data`", (err, rows, fields) => {
            if (err) throw err;
            const userIdFinder = rows.some(id => id.user_id === userId);
            const activeFinder = rows.some(row => row.active === 0);

            if (Boolean(userIdFinder) && Boolean(activeFinder)) {
                db.query("UPDATE users_data SET active = 1 WHERE users_data.user_id = '" + userId + "'", (err, rows, fields) => {
                    res.status(200).json({
                        message: "Account activated succefuly."
                    })
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            error: err,
            message: "Backend error with activation you account."

        })
    }
}

exports.getUserData = (req, res) => {
    try {
        const { id } = req.params

        db.query("SELECT * FROM `users_data` WHERE user_id = '" + id + "' ", (err, rows, fields) => {

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
