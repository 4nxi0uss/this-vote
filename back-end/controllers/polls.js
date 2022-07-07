const db = require('../Database/Database');

exports.patchUpdatePoll = (req, res) => {
    try {
        const { name, question, number, option, id } = req.body

        db.query("UPDATE `polls` SET `name` = '" + name + "', `question` = '" + question + "', `number` = '" + number + "', `options` = '" + option + "' WHERE `polls`.`id` = " + id + "",
            (err, rows) => {
                if (err) throw err;
                res.status(200).json({
                    error: err,
                    message: "Poll updated succefuly."
                })
            })
    } catch (error) {
        res.status(500).json({
            message: "Poll updated unsuccefuly."
        })
    }
}

exports.postPolls = (req, res) => {
    try {
        const { name, question, number, option, id } = req.body

        db.query("INSERT INTO `polls` (`id`, `creator_id`, `name`, `question`, `number`, `options`) VALUES (NULL, '" + id + "', '" + name + "', '" + question + "', '" + number + "', '" + JSON.stringify(option) + "');", (err, rows) => {
            if (err) throw err;
            res.status(200).json({
                message: "Pool added sucesfuly.",
            })
        })

    } catch (err) {
        res.status(500).json({
            message: "Backend error with adding poll.",
            error: err
        })
    }
}

exports.getAllPolls = (req, res) => {
    try {

        db.query(" SELECT * FROM `polls`", (err, rows) => {
            if (err) throw err;
            res.status(200).json({
                message: "fetch all polls.",
                data: rows,
            })
        })

    } catch (err) {
        res.status(500).json({
            message: "Backend error with geting all polls.",
            error: err
        })
    }
}

exports.getPolls = (req, res) => {
    try {
        const { creatorId } = req.params

        db.query(" SELECT * FROM `polls` WHERE `creator_id` = '" + creatorId + "' ", (err, rows, fields) => {
            if (err) throw err;
            res.status(200).json({
                message: "download polls.",
                data: rows,
            })
        })

    } catch (err) {
        res.status(500).json({
            message: "Backend error with geting polls.",
            error: err
        })
    }
}

exports.deletePoll = (req, res) => {
    try {
        const { creatorId, id } = req.body

        db.query("DELETE FROM `polls` WHERE id=" + id + " and creator_id='" + creatorId + "'", (err, rows, fields) => {
            if (err) throw err
            res.status(200).json({
                message: "delating polls succesful.",
            })
        })

    } catch (err) {
        res.status(500).json({
            message: "Backend error with deleting polls.",
            error: err
        })
    }
}

exports.incrementPoll = (req, res) => {
    try {

        const { id, optionId } = req.body
        if (Boolean(id) && Boolean(optionId >= 0)) {
            db.query("SELECT options FROM `polls` where id = " + id + "", (err, rows, fields) => {
                if (err) throw err;
                const info = JSON.parse(rows[0].options)

                Object.keys(info).forEach((el) => { if (info[el].id === optionId) { return info[el].vote = info[el].vote + 1 } })

                db.query("UPDATE `polls` SET `options` = '" + JSON.stringify(info) + "' WHERE `polls`.`id` = " + id + "", (err, rows, fields) => {
                    if (err) throw err
                    res.status(200).json({
                        message: "Incremet was succes"
                    })
                })
            })
        } else {
            res.status(202).json({
                error: "id or optionId is incorect"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Backend error with geting addiing vote.",
            error: error
        })
    }
}