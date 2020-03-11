const express = require("express");
const router = express.Router();
const connection = require("../database/DB");

module.exports = function(db) {
    router.get("/users", async (req, res) => {
        connection.query("SELECT firstname, lastname, email, house_num, street, city, province_code, country_code, postcode FROM user", (err, rows) => {
            if (err) {
                console.log(`Query not run`);
            } else {
                // console.log(rows);
                res.status(200).send(rows);
            }
        });
    });

    router.get("/posts", async (req, res) => {

        connection.query("SELECT * FROM post", (err, rows) => {
            if (err) {
                console.log(`Query not run`);
            } else {
                // console.log(rows);
                res.status(200).send(rows);
            }
        });
    });

    router.get("/images", async (req, res) => {
        connection.query("SELECT * FROM image_list", (err, rows) => {
            if (err) {
                console.log(`Query not run`);
            } else {
                // console.log(rows);
                res.render('index', {data:rows})
            }
        });
    });
    
    return router;
}