const db = require('../Database/Database');
db.connect()

exports.postUser = (req, res, next) => {
    try {
        const { usersEmail, pass, dateOfBirth } = req.body;

        console.log(usersEmail, pass, dateOfBirth)

        db.query("SELECT `email`,`password` FROM `users`", (err, rows, fields) => {
            if (err) throw err;
            const userEmail = rows.find(em => em.email === usersEmail);
            console.log(Boolean(userEmail))

            if (Boolean(userEmail)) {
                res.status(406).json({
                    message: "Uzytkownik o podanym E-mailu istnieje."
                })
            } else {
                db.query('INSERT INTO `users` (`id`, `email`, `password`, `dateOfBirth`) VALUES (NULL, "' + usersEmail + '", "' + pass + '", "' + dateOfBirth + '");', () => {
                    try {
                        res.status(201).json({
                            message: "Pomyślnie zarejestrowano nowego użytkownika."
                        })

                    } catch (err){
                        res.status(402).json({
                            err,
                            message: "Problem z zarejestrowaniem nowego użytkownika."
                        })
                    }
                });

            }

            // res.status(200).json({
            //     rows,
            //     message: "udało się postawić pierwszy krok"
            // })

            // return;
        })



    } catch (error) {
        res.status(500).json({
            error,
            message: "Coś nie tak z Rejestracją "

        })
    }
}
exports.postUserr = (req, res, next) => {

}