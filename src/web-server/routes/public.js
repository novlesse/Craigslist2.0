const express = require("express");
const router = express.Router();
const axios = require("axios");
const bcrypt = require("bcryptjs");
const urlbase = "http://99.79.9.84:8080";

const passport = require("passport");
require("../utilities/passport")(passport);

module.exports = function() {
  
  router.get("/", (req, res) => {
    axios.get(urlbase + "/category")
    .then(response => {
      response.data.map((category) => {category.sub_categories = JSON.parse(category.sub_categories)})
      const msg = req.query.msg || null
      const isLoggedIn = msg === 'success'? true:false
      res.render("pages/index", 
        { title:"Index", 
          css:"index.css", 
          javascript:"index.js",
          label:"search", 
          category:response.data,
          msg: msg,
          isLoggedIn:isLoggedIn});
    })
    .catch(err => {
      console.log("Error:", err.message);
      res.status(500).send("oops, something is wrong");
    })
  });
  
  // router.get("/test", (req, res) => {
  //   res.render("pages/upload", { 
  //     title:"upload", 
  //     css:"index.css", 
  //     javascript:"upload.js"})
  // });
  
  router.get("/posts", (req, res) => {
    axios.get(urlbase + "/posts")
    .then(response => {
      res.status(200).send(response.data)
      // res.render("pages/listing", {listing:response.data});
    })
    .catch(err => {
      console.log("Error:", err.message);
      res.status(500).send("oops, something is wrong");
    })
  })

  router.post("/signup", (req, res) => {
    try {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          const signup = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            house_num: req.body.housenumber,
            street: req.body.street,
            city: req.body.city,
            province_code: req.body.province.toUpperCase(),
            postcode: req.body.postalcode,
            country_code: req.body.country.toUpperCase()
          }
          axios.post(urlbase + "/users", signup)
            .then((response) => {
              // console.log(response.data);
              
              res.cookie('user_id', response.data.id);
              res.redirect('/?msg=success');
              // res.redirect(`/api/users/user/${user.id}`);
            })
            .catch((err) => {
              console.log("Error:", err.message);
              res.status(500).send("oops, something is wrong");
            })
        });
      });
      
    } catch(err) {
      res.status(400).send('Bad request')
    }
      
  });
  
  router.post("/login", (req, res, next) => {
    console.log('login')
    // passport.authenticate("local", {
      // successRedirect: `/api/users/user/${user.id}`,
      // failureRedirect: "/?msg=Login failed",
      // failureFlash: "Missing credentials."
    // });
    passport.authenticate('local', (err, user, info) => {
      if (info !== undefined) {
        console.log('info ' + info.message);
      }
      if (err || !user) {
        console.log('!user');
        res.redirect("/?msg=Password or email is incorrect");
      } else {
        
        req.logIn(user, err => {
          if (err) { console.log('err'); return next(err) };
          res.cookie('user_id', req.user.id);
          res.redirect('/?msg=success');
          // res.redirect(`/api/users/user/${user.id}`);
        });
      }
    })(req, res);
  })

  router.post("/search", (req, res) => {
    try{
      req.body.category_id = req.body.category_id? req.body.category_id:null
      req.body.sub_category_id = req.body.sub_category_id? req.body.sub_category_id:null
      req.body.keyword = req.body.keyword? req.body.keyword:null
      axios.post(urlbase + "/posts/search", req.body)
      .then((response) => {
        res.render("pages/listing", {
          listings: response.data,
          search: req.body.keyword,
          css:"listings.css",
          javascript:"index.js"
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