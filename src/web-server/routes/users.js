const express = require("express");
const router = express.Router();
const axios = require("axios");
const urlbase = "http://99.79.9.84:8080";
const imagUrlBase = "http://craiglist2.s3-website.ca-central-1.amazonaws.com/300xAUTO/";
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
        req.body.description = req.body.description? req.body.description: null
        const images = JSON.parse(req.body.images).map(element => imagUrlBase + element);
        const listing = {
            seller: parseInt(req.body.seller),
            title: req.body.title,
            price: parseFloat(req.body.price),
            item_condition_id: parseInt(req.body.condition),
            category_id: parseInt(req.body.category),
            sub_category_id: parseInt(req.body.subCategory),
            description: req.body.description,
            images: JSON.stringify(images)
        };

        axios.post(urlbase + "/posts", listing)
        .then(response => {
            console.log('successfully create post')
            res.status(200).send(response.body);
        })
        .catch(err => {
            console.log("error:",  err.message)
            res.status(500).send("oops, something is wrong");
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