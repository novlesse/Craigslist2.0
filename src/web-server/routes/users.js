const express = require("express");
const router = express.Router();
const axios = require("axios");
const urlbase = "http://99.79.9.84:8080/api";
module.exports = function() {
    // get all category & sub_category 
    // can be used to render new post form
    router.get("/category", (req, res) => {
        axios.get(urlbase + "/category")
        .then(response => {

        })
        .catch(err => {
            console.log("Error:", err.message);
            res.status(500).send("oops, something is wrong");
        })
    });

    //create new post
    router.post("/posts", (req, res) => {
        const listing = {
            title: req.body.title,
            price: parseInt(req.body.price),
            item_condition_id: parseInt(req.body.condition),
            category_id: parseInt(req.body.category),
            sub_category_id: parseInt(req.body.subCategory),
            description: req.body.description,
            images:req.body.testImage
        };

        axios.post(urlbase + "/posts", listing)
        .then(response => {

        })
        .catch(err => {
            console.log("error:",  err.message)
        })
    
    });

    //update a post
    router.put("/posts/:post_id", (req, res) => {
    
    })

    //list a user's rating
    router.get("/ratings/:user_id", (req, res) => {
    
    })
    //create a new rating
    router.post("/ratings/:user_id", (req, res) => {
    
    })

    //update a rating
    router.put("/ratings/:rating_id", (req, res) => {
    
    })

    //create a transaction
    router.post("/transactions/:post_id", (req, res) => {
    
    })

    //list all transaction by given user
    router.get("/transactions/:user_id", (req, res) => {
    
    })
    return router;
}