const db = require('../Database/Database');
const { v4: uid } = require('uuid');
db.connect()

//checking email in database
const checkEmail = (rows, usersEmail) => {
    return Boolean(rows.find((em) => em.email === usersEmail))
}

const ScrapOfEmail = (email) => {
    return email.slice(String(email).indexOf('@')+1, email.indexOf("."))
}

// register user in database
exports.postRegisterUser = (req, res, next) => {
    try {
        const { usersEmail: email, pass, dateOfBirth } = req.body;

        console.log(email, pass, dateOfBirth)

        db.query("SELECT `email`,`password` FROM `login`", (err, rows, fields) => {
            if (err) throw err;
            // const userEmail = rows.find(em => em.email === email);
            // console.log(Boolean(userEmail));
            console.log(checkEmail(rows, email));

            if (checkEmail(rows, email)) {
                res.status(406).json({
                    message: "Uzytkownik o podanym E-mailu istnieje."
                })
            } else {
                db.query('INSERT INTO `login` (`id`, `user_id`,`email`, `password`, `dateOfBirth`) VALUES (NULL,"' + uid() + '", "' + email + '", "' + pass + '", "' + dateOfBirth + '");', () => {
                    try {
                        res.status(201).json({
                            message: "Pomyślnie zarejestrowano nowego użytkownika."
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
        // console.log('fists',  password, email);
        //     console.log('sec  ',ScrapOfEmail(email))
        // serch user from scratch of email
        db.query("SELECT * FROM `login` WHERE `email` LIKE  " + `'%${ScrapOfEmail(email)}%'`, (err, rows, fields) => {
            if (err) throw err;
            // const userEmail = rows.find(em => em.email === usersEmail);
            if (!(checkEmail(rows, email))) {
                res.status(406).json({
                    message:"Login lub hasło jest nie poprawne, sprobój ponownie",
                    active: false
                })
            }else {
                res.status(201).json({
                    message: 'zostałeś zalogowany',
                    active: true
                })
                
            }
        })
    } catch (err) {

    }
}