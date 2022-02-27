const db = require('../Database/Database');
const { v4: uid } = require('uuid');
const { closeSync } = require('fs');
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

        // console.log(email, pass)

        db.query("SELECT `email`,`password` FROM `login`", (err, rows, fields) => {
            if (err) throw err;

            // console.log(checkEmail(rows, email));

            if (checkEmail(rows, email)) {
                res.status(406).json({
                    message: "Uzytkownik o podanym E-mailu istnieje."
                })
            } else {
                db.query('INSERT INTO `login` (`user_id`,`email`, `password`) VALUES ("' + uid() + '", "' + email + '", "' + pass + '");', (err, rows, fields) => {
                    try {
                        res.status(201).json({
                            message: "Pomyślnie zarejestrowano nowego użytkownika.",
                            error: err,
                            data: rows
                        })

                    } catch (err) {
                        res.status(402).json({
                            err,
                            message: "Problem z zarejestrowaniem nowego użytkownika."
                        })
                    }
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            error,
            message: "Coś nie tak z Rejestracją "

        })
    }
}

// login user 
exports.postLoginUser = (req, res, next) => {
    try {
        const { password, email } = req.body;

        db.query("SELECT * FROM `login` WHERE `email` LIKE  " + `'%${ScrapOfEmail(email)}%'`, (err, rows, fields) => {
            if (err) throw err;
            // const userEmail = rows.find(em => em.email === usersEmail);
            if (!(checkEmail(rows, email))) {
                res.status(406).json({
                    message: "Login lub hasło jest nie poprawne, sprobój ponownie",
                    login: false,
                })
            } else {
                res.status(201).json({
                    message: 'zostałeś zalogowany',
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

        // console.log(userId, name, surname, dateOfBirth)

        db.query("SELECT user_id FROM `users_data`", (err, rows, fields) => {
            if (err) throw err;
            const userIdFinder = rows.some(id => id.user_id === userId);

            // INSERT INTO `users_data` (`user_id`, `Name`, `Surname`, `date_of_birth`, `type_of_account`, `active`, `polls`) VALUES ('03e47531-cc8f-4927-9857-c3bc73c305cc', '"tet', 'testtest', '2021-06-06', '0', '0', '[2]')
            if (!Boolean(`${userIdFinder}`)) {
                db.query("INSERT INTO `users_data` (`user_id`, `Name`, `Surname`, `date_of_birth`, `type_of_account`, `active`, `polls`) VALUES ('" + userId + "', '" + name + "', '" + surname + "', '" + dateOfBirth + "', '0', '0', '[]')", (err, rows, fields) => {
                    if (err) throw err;
                    res.status(200).json({
                        message: 'wstawiono razem, pomyślnie zakutalizowano dane',
                        rows: rows,
                        error: err,
                    })
                })
            } else {
                db.query("UPDATE `users_data` SET `Name` = '" + name + "', `Surname` = '" + surname + "', `date_of_birth` = '" + dateOfBirth + "' WHERE `users_data`.`user_id` ='" + userId + "'", (err, rows, fields) => {
                    if (err) throw err;
                    res.status(200).json({
                        message: 'zaktualozowano dane',
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
            message: "Coś nie tak z aktalizacją danych "

        })
    }
}

// UPDATE users_data SET active = 3 WHERE users_data.user_id = 'a6ff932f-0da3-490d-91dd-e60876db2cc9';


exports.patchActiveUser = (req, res, next) => {
    try {
        const { userId } = req.body
        db.query("SELECT user_id, `active` FROM `users_data`", (err, rows, fields) => {
            if (err) throw err;
            // console.log(rows)
            const userIdFinder = rows.some(id => id.user_id === userId);
            const activeFinder = rows.some(row => row.active === 0);

            if (Boolean(userIdFinder) && Boolean(activeFinder)) {
                db.query("UPDATE users_data SET active = 1 WHERE users_data.user_id = '" + userId + "'", (err, rows, fields) => {
                    res.status(200).json({
                        message: "Konto zaktualizowano pomyślnie"
                    })
                })
            }

        })
    } catch (error) {
        res.status(500).json({
            error: err,
            message: "Coś nie tak z aktalizacją danych "

        })
    }
}


exports.getUserData = (req, res, next) => {
    try {
        const { id } = req.params
        // console.log(id)
        // console.log('tu')

        db.query("SELECT * FROM `users_data` WHERE user_id = '" + id + "' ", (err, rows, fields) => {
            // console.log('ty')
            // console.log(rows)
            // console.log(err)

            if (err) throw err;
            res.status(200).json({
                message: "twoje dane",
                data: rows,
                error: err
            })
        })


    } catch (err) {
        res.status(500).json({
            message: "Błąd z serwerem",
            error: err
        })
    }
}

exports.postPolls = (req, res, next) => {
    try {
        const { name, question, number, option, id } = req.body
        // INSERT INTO `polls` (`id`, `creator_id`, `name`, `question`, `number`, `options`) VALUES (NULL, 'a6ff932f-0da3-490d-91dd-e60876db2cc9', 'name', 'question name?', '321123', '[{\'name:\' \'2\', \'color:\' \'#bc3434\'},\r\n{\'name:\' \'3\', \'color:\' \'#3da485\'},\r\n{\'name:\' \'4\', \'color:\' \'#3da485\'},\r\n{\'name:\' \'5\', \'color:\' \'#e34f45\'},]');

        // console.log(option)

        db.query("INSERT INTO `polls` (`id`, `creator_id`, `name`, `question`, `number`, `options`) VALUES (NULL, '" + id + "', '" + name + "', '" + question + "', '" + number + "', '" + "[" + option + "]" + "');", (err, rows, fields) => {
            if (err) throw err;
            res.status(200).json({
                message: "Pool added sucesfuly",
                data: rows,
                error: err
            })
        })

    } catch (err) {
        res.status(500).json({
            message: "Błąd z serwerem.",
            error: err
        })
    }
}