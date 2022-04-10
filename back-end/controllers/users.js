const db = require('../Database/Database');
const { v4: uid } = require('uuid');
const { serialize } = require('v8');
db.connect()

//checking email in database
const checkEmail = (rows, usersEmail) => {
    return Boolean(rows.find((em) => em.email === usersEmail))
}

const ScrapOfEmail = (email) => {
    return email.slice(String(email).indexOf('@') + 1, email.indexOf("."))
}

// register user in database
exports.postRegisterUser = (req, res, next) => {
    try {
        const { usersEmail: email, pass } = req.body;

        db.query("SELECT `email`,`password` FROM `login`", (err, rows, fields) => {
            if (err) throw err;

            if (checkEmail(rows, email)) {
                res.status(406).json({
                    message: "User with this E-mail does not exist."
                })

            } else {
                db.query('INSERT INTO `login` (`user_id`,`email`, `password`) VALUES ("' + uid() + '", "' + email + '", "' + pass + '");', (err, rows, fields) => {

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

// login user 
exports.postLoginUser = (req, res, next) => {

    try {
        const { password, email } = req.body;

        db.query("SELECT * FROM `login` WHERE `email` LIKE  " + `'%${ScrapOfEmail(email)}%'`, (err, rows, fields) => {
            if (err) throw err;

            if (!(checkEmail(rows, email))) {
                res.status(406).json({
                    message: "Login or password is incorect.",
                    login: false,
                })

            } else {
                res.status(201).json({
                    message: 'Logged.',
                    login: true,
                    rows: rows,
                })

            }
        })

    } catch (err) {

    }
}

// add or update info about user
exports.patchUserInfo = (req, res, next) => {
    try {
        const { userId, name, surname, dateOfBirth } = req.body

        db.query("SELECT user_id FROM `users_data`", (err, rows, fields) => {
            if (err) throw err;
            const userIdFinder = rows.some(id => id.user_id === userId);

            if (!Boolean(`${userIdFinder}`)) {
                db.query("INSERT INTO `users_data` (`user_id`, `Name`, `Surname`, `date_of_birth`, `type_of_account`, `active`, `polls`) VALUES ('" + userId + "', '" + name + "', '" + surname + "', '" + dateOfBirth + "', '0', '0', '[]')", (err, rows, fields) => {
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
                        // error: err
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

exports.patchActiveUser = (req, res, next) => {
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

exports.getUserData = (req, res, next) => {
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

exports.postPolls = (req, res, next) => {
    try {
        const { name, question, number, option, id } = req.body

        db.query("INSERT INTO `polls` (`id`, `creator_id`, `name`, `question`, `number`, `options`) VALUES (NULL, '" + id + "', '" + name + "', '" + question + "', '" + number + "', '" + JSON.stringify(option) + "');", (err, rows, fields) => {
            if (err) throw err;
            res.status(200).json({
                message: "Pool added sucesfuly.",
                data: rows,
            })
        })

    } catch (err) {
        res.status(500).json({
            message: "Backend error with adding pool.",
            error: err
        })
    }
}

exports.getPolls = (req, res, next) => {
    try {

        const { creatorID } = req.params

        //SELECT * FROM `polls` WHERE `creator_id` = '236364d2-59be-4612-8ad0-4e6407da5428';
        db.query(" SELECT * FROM `polls` WHERE `creator_id` = '" + creatorID + "' ", (err, rows, fields) => {
            if (err) throw err;
            res.status(200).json({
                message: "download polls.",
                data: rows,
            })
        })

    } catch (err) {
        res.status(500).json({
            message: "Backend error with geting pools.",
            error: err
        })
    }
}

// UPDATE `polls` SET `options` = '[\"option0\":{\"name\": \"123\", \"color\": \"#832525\", \"vote\": 2},\"option1\":{\"name\": \"sad\", \"color\": \"#ff0000\", \"vote\": 0},]' WHERE `polls`.`id` = 1;

exports.putPoll = (req, res, next) => {

    try {
        const { id, option } = req.body

console.log(option)
// console.log(JSON.stringify(option))

        // db.query("UPDATE `polls` SET `options` = '" + JSON.stringify(option) + "' WHERE `polls`.`id` = " + id + ";", (err, rows, fields) => {
        //     if (err) throw err;
        //     res.status(200).json({
        //         message: "Vote added succefsuly"
        //     })
        // })

    } catch (error) {
        res.status(500).json({
            message: "Backend error with geting addiing vote.",
            error: err
        })
    }
}