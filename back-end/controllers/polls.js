const db = require('../Database/Database');

exports.patchUpdatePoll = (req, res) => {
    try {
        const { name, question, number, option, id } = req.body

        db.query("UPDATE `polls` SET `name` = ? , `question` = ? , `number` = ? , `options` = ?  WHERE `polls`.`id` = ? ", [name, question, number, JSON.stringify(option), id],
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
        const { name, question, number, option, userId } = req.body

        db.query("INSERT INTO `polls` (`id`, `user_id`, `name`, `question`, `number`, `options`) VALUES (NULL, ? , ? , ? , ? , ? )", [userId, name, question, number, JSON.stringify(option)], (err, rows) => {
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
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        if (!(page > 0 && limit > 0)) return res.status(401).json({ message: 'The page number or limit must not be less than 0' })

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit

        db.query("SELECT COUNT(*) FROM `polls`", (err, countRows) => {
            if (err) throw err;

            db.query("SELECT * FROM `polls`", (err, rows) => {
                if (err) throw err;

                const numberOfPages = Math.ceil(countRows[0]['COUNT(*)'] / limit)

                if (page > numberOfPages) return res.status(204).json({
                    message: "No content",
                    page,
                    limit,
                    numberOfPages,
                })

                const resData = rows.slice(startIndex, endIndex)

                res.status(200).json({
                    message: "fetched all polls.",
                    page,
                    limit,
                    numberOfPages,
                    data: resData,
                })
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
        const { userId } = req.params
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        if (!Boolean(userId)) return res.status(401)
        if (!(page > 0 && limit > 0)) return res.status(401).json({ message: 'The page number or limit must not be less than 0' })

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit


        db.query("SELECT COUNT(*) FROM `polls`  WHERE `user_id` = ? ", [userId], (err, countRows) => {
            if (err) throw err;

            db.query(" SELECT * FROM `polls` WHERE `user_id` = ? ", [userId], (err, rows) => {
                if (err) throw err;

                const numberOfPages = Math.ceil(countRows[0]['COUNT(*)'] / limit)

                if (page > numberOfPages) return res.status(204).json({
                    message: "No content",
                    page,
                    limit,
                    numberOfPages,
                })

                const resData = rows.slice(startIndex, endIndex)

                res.status(200).json({
                    message: "download polls.",
                    page,
                    limit,
                    numberOfPages,
                    data: resData,
                })
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
        const { userId, id } = req.body

        if (!Boolean(userId) || !Boolean(id)) return res.status(401)

        db.query("DELETE FROM `polls` WHERE id= ? and user_id= ? ", [id, userId], (err) => {
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

            db.query("SELECT options FROM `polls` where id = ? ", [id], (err, rows, fields) => {
                if (err) throw err;
                const info = JSON.parse(rows[0].options)

                Object.keys(info).forEach((el) => { if (info[el].id === optionId) { return info[el].vote = info[el].vote + 1 } })

                db.query("UPDATE `polls` SET `options` = ?  WHERE `polls`.`id` = ? ", [JSON.stringify(info), id], (err, rows, fields) => {
                    if (err) throw err
                    res.status(200).json({
                        message: "Incremet was succes"
                    })
                })
            })
        } else {
            res.status(401).json({
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