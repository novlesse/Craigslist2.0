const express = require("express");
const router = express.Router();
const axios = require("axios");
const urlbase = "http://99.79.9.84:8080";

module.exports = function() {
  router.get("/", (req, res) => {
    axios.get(urlbase + "/category")
    .then(response => {
      response.data.map((category) => {category.sub_categories = JSON.parse(category.sub_categories)})
      res.render("pages/index", 
        { title:"Index", 
          css:"index.css", 
          javascript:"index.js",
          label:"search", 
          category:response.data});
    })
    .catch(err => {
      console.log("Error:", err.message);
      res.status(500).send("oops, something is wrong");
    })
      
  });
  
  router.get("/test", (req, res) => {
    res.render("pages/upload", { 
      title:"upload", 
      css:"index.css", 
      javascript:"upload.js"})
  });
  
  router.get("/posts", (req, res) => {
    axios.get(urlbase + "/posts")
    .then(response => {
      // render home page
    })
    .catch(err => {
      console.log("Error:", err.message);
      res.status(500).send("oops, something is wrong");
    })
  })

    router.post("/signup", (req, res) => {
        try {
            const signup = {
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
            }
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
        } catch(err) {
            res.status(400).send('Bad request')
        }
        
    });
    
    router.post("/search", (req, res) => {
        try{
            // console.log(req.body);
            req.body.category_id = req.body.category_id? req.body.category_id:null
            req.body.sub_category_id = req.body.sub_category_id? req.body.sub_category_id:null
            req.body.keyword = req.body.keyword? req.body.keyword:null
            axios.post(urlbase + "/posts/search", req.body)
            .then((response) => {
                // response.data.forEach(function(item) {
                //     let myItem = item.image_list
                //     let hi = JSON.parse(myItem)
                //     console.log(JSON.stringify(hi[0]))
                // })
            res.render("pages/listing", {
                listings: response.data,
                search: req.body.keyword,
                css:"listings.css",
                javascript:"index.js",
                title:"Index"
            });
            // res.status(200).send(response.data); //testing purpose
            })
                .catch((err) => {
                console.log("Error:", err.message);
                res.status(500).send("oops, something is wrong");
            })
        } catch(err) {
            res.status(400).send('Bad request')
        }
       
        
    });
    
    return router;
}