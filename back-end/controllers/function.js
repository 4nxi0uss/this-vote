const db = require('../Database/Database');

exports.incrementPoll = (req, res) => {
    try {

        const { id, optionID } = req.body
        db.query("SELECT options FROM `polls` where id = " + id + "", (err, rows, fields) => {
            if (err) throw err;
            const info = JSON.parse(rows[0].options)

            Object.keys(info).forEach((el) => { if (info[el].id === optionID) { return info[el].vote = info[el].vote + 1 } })

            db.query("UPDATE `polls` SET `options` = '" + JSON.stringify(info) + "' WHERE `polls`.`id` = " + id + "", (err, rows, fields) => {
                if (err) throw err
                res.status(200).json({
                    message: "Incremet was succes"
                })
            })
        })
    } catch (error) {
        res.status(500).json({
            message: "Backend error with geting addiing vote.",
            error: error
        })
    }
}