const express = require("express");
const router = express.Router();
const axios = require("axios");

module.exports = function (db) {
    router.get("/", (req, res) => {
        res.send("hello");
    });

    router.get("/sheet", (req, res) => {
        axios.get("https://sheet.best/api/sheets/bf74a7d5-8229-46a0-8cc0-ff36e26822f9")
            .then(data => {
                // console.log(data.data);
                res.render('index_sheet', {
                    data: data.data
                })
            })
            .catch(err => {
                res.send('error')
            })
    });

    router.post("/update/:id", (req, res) => {
        console.log(req.body);
        axios.patch(`https://sheet.best/api/sheets/bf74a7d5-8229-46a0-8cc0-ff36e26822f9/${req.params.id}`, req.body)
            .then(data => {
                console.log(data.data);
                res.sendStatus(200);
                // res.render('index_sheet', {data:data.data})
            })
            .catch(err => {
                res.send('error')
            })
    });
    return router;
}