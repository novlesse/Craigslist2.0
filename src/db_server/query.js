const express = require("express");
const router = express.Router();
const connection = require("../database/DB");

module.exports = function (db) {

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

    // router.post("/search", async (req, res) => {
    //     let search = ("%" + req.body.product + "%");
    //     console.log(search);
    //     connection.query(`SELECT * FROM post 
    //       JOIN image_list ON post.image_list_id = image_list.id 
    //       WHERE title LIKE ?`, search, (err, rows) => {
    //         if (err) {
    //             console.log("Error:", err);
    //         } else {
    //             console.log(rows)
    //             let html = "<ul>";
    //             rows.forEach(function(row) {
    //                 html += "<li>" + row.title + "price:" + row.price + "image:<img src='" + row.image_link + "'></li>";
    //             });
    //             html += "</ul>";
    //             res.status(200).send(html);
    //         }
    //     });
    // });


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