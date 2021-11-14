const db = require('../Database/Database');
const { v4: uid } = require('uuid');
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

        console.log(email, pass)

        db.query("SELECT `email`,`password` FROM `login`", (err, rows, fields) => {
            if (err) throw err;

            console.log(checkEmail(rows, email));

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

exports.patchUserInfo = (req, res, next) => {
    try {
        const { userId, name, surname, dateOfBirth } = req.body

        console.log(userId, name, surname, dateOfBirth)

        db.query("SELECT user_id FROM `users_data`", (err, rows, fields) => {
            if (err) throw err;

            const userIdFinder = rows.some(id => id.userId === userId);


            if (!Boolean(`${userIdFinder}`)) {
                db.query("INSERT INTO `users_data` (`user_id`, `Name`, `Surname`, `date_of_birth`, `type_of_account`, `active`, `polls`) VALUES ('" + userId + "', '" + name + "', '" + surname + "', '" + dateOfBirth + "', '0', '0', '[]')", (err, rows, fields) => {
                    if (err) throw err;
                    res.status(200).json({
                        message: 'pomyślnie zakutalizowano dane',
                        data: rows,
                    })
                })
            } else {
                db.query("UPDATE `users_data` SET `Name` = '" + name + "', `Surname` = '" + surname + "', `date_of_birth` = '" + dateOfBirth + "' WHERE `users_data`.`user_id` ='" + userId + "'", (err, rows, fields) => {
                    // if (err) throw err;
                    console.log(err)
                    res.status(200).json({
                        rows: err
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