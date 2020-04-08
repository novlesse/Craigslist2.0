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
            if (req.url = "/listing-form") res.send("<h5>Please login to continue</h5>")
            else res.redirect("/?msg=Please login to continue");
        }
    }

    router.get("/listing-form", authenticate, (req, res) => {
        Promise.all([
            axios.get(urlbase + "/condition"),
            axios.get(urlbase + "/category")
        ])
        .then(responses => {
            responses[1].data.map((category) => { category.sub_categories = JSON.parse(category.sub_categories) });
            res.render('partials/index/listing-form',
            {
                label: "post",
                condition: responses[0].data,
                category: responses[1].data
            })
        })
        .catch(err => {
            console.log("Error:", err.message);
            res.status(500).send("oops, something is wrong");
        })
    });

    router.get('/account', authenticate, (req, res) => {
        Promise.all([
            axios.get(`${urlbase}/users/${req.user.id}`),
            axios.get(`${urlbase}/ratings/${req.user.id}`),
            axios.get(`${urlbase}/posts/seller/${req.user.id}`)
        ])
        .then((responses) => {
            const { username, email, average_rating, total_rating, is_verified } = responses[0].data[0];
            let ratings = responses[1].data;
            //set average_rating to 0 if user has no rating

            responses[0].data[0].average_rating = ratings.length == 0 ? 0 : responses[0].data[0].average_rating.toFixed(2)
            const { username, email, average_rating, total_rating, is_verified } = responses[0].data[0];
             // console.log(ratings)

            ratings.map(rating => rating.created_at = rating.created_at.substr(0, 10));
            res.render('pages/userprofile', {
                javascript: "../../index.js",
                username: username,
                email: email,
                average_rating: average_rating,
                total_rating: total_rating,
                is_verified: is_verified,
                ratings: ratings,
                show_personal_listings: true,
                listing: responses[2].data
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send("Internal server error")
        })
    })

    
    //create new post
    router.post("/posts", authenticate, (req, res) => {
        try {
            req.body.description = req.body.description ? req.body.description : null
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
                    console.log("error:", err.message)
                    res.status(500).send("oops, something is wrong");
                })
        } catch (err) {
            res.status(400).send('Bad request')
        }
    });

    router.get('/transaction', (req,res)=>{
        res.render('pages/transaction', {  
          css: 'transaction.css'    
        })
      })

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