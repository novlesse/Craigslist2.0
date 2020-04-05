const express = require("express");
const router = express.Router();
const axios = require("axios");
const urlbase = "http://99.79.9.84:8080";
const imagUrlBase = "http://craiglist2.s3-website.ca-central-1.amazonaws.com/300xAUTO/";

module.exports = function (passport) {
    const authenticate = (req, res, next) => {
        if (req.isAuthenticated()) {
            console.log('success')
            next();
        } else {
            if(req.url = "/listing-form") res.send("<h5>Please login to continue</h5>")
            else res.redirect("/?msg=Please login to continue");
        }
    }
    
    router.get("/listing-form", authenticate, (req, res) => {
        axios.get(urlbase + "/condition")
        .then(condition => {
            axios.get(urlbase + "/category")
            .then(response => {
                response.data.map((category) => {category.sub_categories = JSON.parse(category.sub_categories)})
                res.render('partials/index/listing-form', 
                          { condition:condition.data, 
                            label:"post",
                            category:response.data})
            })
        })
        .catch(err => {
            console.log("Error:", err.message);
            res.status(500).send("oops, something is wrong");
        })
    });
    
    //get a user's profile
    router.get('/user', authenticate, (req, res) => {
        // axios.get(`${urlbase}/users/${req.params.id}`)
        console.log(req.user.id)
        axios.get(`${urlbase}/users/${req.user.id}`)
            .then((response) => {
                //console.log(response);
                const { username, email, average_rating, total_rating, is_verified } = response['data'][0];
                if (average_rating) { //if not null, fetch rating
                    axios.get(`http://99.79.9.84:8080/ratings/${req.params.id}`)
                    // axios.get('http://99.79.9.84:8080/ratings/1')
                    .then((response) => { 
                        let ratings = response['data'];
                        console.log(ratings)
                        ratings.map(rating=>rating.created_at=rating.created_at.substr(0,10));
                        res.render('pages/userprofile', {
                            username: username,
                            email: email,
                            average_rating: average_rating.toFixed(2),
                            total_rating:total_rating,
                            is_verified: is_verified,
                            ratings: ratings
                        })
                    })
                    .catch((err) => console.log(err))
                } else { //if null there is no rating
                    res.render('pages/userprofile', {
                        username: username,
                        email: email,
                        average_rating: 0,
                        total_rating: total_rating,
                        is_verified: is_verified,
                        ratings: []
                    })
                }
            })
            .catch((err) => { console.log(err) })
    }) 

    //create new post
    router.post("/posts", authenticate, (req, res) => {
        try{
            req.body.description = req.body.description? req.body.description: null
            const images = JSON.parse(req.body.images).map(element => imagUrlBase + element);
            //hard code user_id for testing purpose
            const listing = {
                seller: 3,
                title: req.body.title,
                price: parseFloat(req.body.price),
                item_condition_id: parseInt(req.body.condition_id),
                category_id: parseInt(req.body.category_id),
                sub_category_id: parseInt(req.body.sub_category_id),
                description: req.body.description,
                images: JSON.stringify(images)
            }
            axios.post(urlbase + "/posts", listing)
            .then(response => {
                console.log('successfully create post')
                res.status(200).send(response.body);
            })
            .catch(err => {
                console.log("error:",  err.message)
                res.status(500).send("oops, something is wrong");
            })
        } catch(err) {
            res.status(400).send('Bad request')
        }
    });
    
    //logout a user
    router.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/?msg=You are now logged out.");
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