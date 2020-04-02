const express = require("express");
const router = express.Router();
const axios = require("axios");
const urlbase = "http://99.79.9.84:8080";

module.exports = function() {
    router.get("/", (req, res) => {
        res.render("pages/index")
    });
    
    router.get("/test", (req, res) => {
        res.render("pages/test")
    });
    
    router.get("/posts", (req, res) => {
        axios.get(urlbase + "/posts")
        .then(response => {

        })
        .catch(err => {
            console.log("Error:", err.message);
            res.status(500).send("oops, something is wrong");
        })
    })

    router.post("/signup", (req, res) => {
        let signup = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password, 
            house_num: req.body.housenumber,
            street: req.body.street,
            city: req.body.city,
            province_code: req.body.province.toUpperCase(),
            postcode: req.body.postalcode,
            country_code: req.body.country.toUpperCase()
        };
        axios.post(urlbase + "/users", signup)
        .then((response) => {
            console.log(signup);
            res.render("pages/index", {
                user: response
            });
        })
        .catch((err) => {
            console.log("Error:", err.message);
            res.status(500).send("oops, something is wrong");
        })
    });
    
    router.post("/search", (req, res) => {
        let search = req.body.product;
        if (search.length == 0 || search == " ") {
            search = null;
        }
        console.log(search);
        axios.post(urlbase + "/posts/search/", search)
        .then((response) => {
            res.render("pages/listing", {
                listings: response,
                search: search
            });
        })
        .catch((err) => {
            console.log("Error:", err.message);
            res.status(500).send("oops, something is wrong");
        })
    });


    return router;
}