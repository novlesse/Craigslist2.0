const express = require("express");
const router = express.Router();
const axios = require("axios");
const bcrypt = require("bcryptjs");
const urlbase = "http://99.79.9.84:8080";

const passport = require("passport");
require("../utilities/passport")(passport);

module.exports = function() {
  router.get("/", (req, res) => {
    Promise.all([
      axios.get(urlbase + "/category"),
      axios.get(urlbase + "/province")
    ])
    .then(responses => {
      if (responses[0].data && responses[1].data) {
        responses[0].data.map((category) => { category.sub_categories = JSON.parse(category.sub_categories) })
        const header = req.user ? 'private-header' : 'public-header'
        const message = req.query.msg || null
        res.render("pages/index",
        {
          title: "Index",
          css: "index.css",
          label: "search",
          header: header,
          category: responses[0].data,
          province: responses[1].data,
          msg: message
        });
      } else {
        // console.log("Error:", err.message);
        res.status(500).send("oops, something is wrong");
      }  
    })
    .catch(err=> {
      console.log(err.message);
      res.status(500).send("oops, something is wrong");
    })
  });

  router.get("/posts", (req, res) => {
    Promise.all([
      axios.get(urlbase + "/category"),
      axios.get(urlbase + "/province"),
      axios.get(urlbase + "/posts")
    ])
    .then(responses => {
      responses[0].data.map((category) => { category.sub_categories = JSON.parse(category.sub_categories) })
      responses[2].data.map((listing) => {
        listing.image_list = JSON.parse(listing.image_list)
        listing.average_rating = listing.average_rating ? listing.average_rating.toFixed(2) : 0
      })
      const header = req.user ? 'private-header' : 'public-header'
      const msg = req.query.msg || null
      res.render("pages/listing",
        {
          title: "Listings",
          css: "listings.css",
          label: "search",
          search:"",
          header: header,
          category: responses[0].data,
          province: responses[1].data,
          message: msg,
          listings: responses[2].data
        }); 
      })
    .catch(err => {
      console.log("Error:", err.message);
      res.status(500).send("oops, something is wrong");
    })
  })

  //get a user's public profile by id
  router.get('/user/:id', (req, res) => {
    //if the user sent request logged in and his id equals to the user's id he required redirect to his own profile page
    console.log(req.user.id, req.params.id)
    if (req.user && req.user.id === req.params.id) res.redirect("/api/users/account")

    Promise.all([
      axios.get(`${urlbase}/users/${req.params.id}`),
      axios.get(`${urlbase}/ratings/${req.params.id}`)
    ])
      .then((responses) => {
        //console.log(response);
        let ratings = responses[1].data;
        //set average_rating to 0 if user has no rating
        responses[0].data[0].average_rating = ratings.length == 0 ? 0 : responses[0].data[0].average_rating.toFixed(2)
        const { username, email, average_rating, total_rating, is_verified } = responses[0].data[0];
        
        // console.log(ratings)
        ratings.map(rating => rating.created_at = rating.created_at.substr(0, 10));
        res.render('pages/userprofile', {
          username: username,
          email: email,
          average_rating: average_rating,
          total_rating: total_rating,
          is_verified: is_verified,
          ratings: ratings,
          show_personal_listings: false
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send("Internal server error")
      })
  })

  router.post("/signup", (req, res) => {
    //form data validation
    if (!(req.body.username && req.body.firstname && req.body.lastname && req.body.email
        && req.body.password && req.body.housenumber && req.body.province && req.body.postalcode 
        && req.body.country)) res.status(400).send("Form data is invalid!")
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
            country_code: req.body.country.toUpperCase(),
            postcode: req.body.postalcode,
          }
          Promise.all([
            axios.get(`${urlbase}/users/email/${signup.email}`),
            axios.get(`${urlbase}/users/username/${signup.username}`)
          ])
          .then(responses => {
            if(responses[0].data.length != 0 && responses[1].data.length != 0) {
              res.redirect('/?msg=username or email has already been used');
            } else {
              axios.post(urlbase + "/users", signup)
              .then((response) => {
                // console.log(response.data);
                res.cookie('user_id', response.data.id);
                console.log(response.data.id)
                res.redirect('/?msg=success');
                // res.redirect(`/api/users/user`);
              })
              .catch((err) => {
                console.log("Error:", err.message);
                res.status(500).send("oops, something is wrong");
              })
            }
          })
        });
      });
    } catch(err) {
      res.status(400).send('Bad request')
    }

  });

  router.post("/login", (req, res, next) => {
    //form data validation
    if (!(req.body.email && req.body.password)) res.status(400).send("Form data is invalid")
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
          // res.redirect(`/api/users/user`);
        });
      }
    })(req, res);
  })

  router.post("/search", (req, res) => {
    try{
      req.body.category_id = req.body.category_id? req.body.category_id:null
      req.body.sub_category_id = req.body.sub_category_id? req.body.sub_category_id:null
      req.body.keyword = req.body.keyword? req.body.keyword:null
      Promise.all([
        axios.get(urlbase + "/category"),
        axios.get(urlbase + "/province"),
        axios.post(urlbase + "/posts/search", req.body)
      ])
      .then(responses => {
        // console.log(, values[1].data, values[2].data);
        responses[0].data.map((category) => { category.sub_categories = JSON.parse(category.sub_categories) })
        responses[2].data.map((listing) => { listing.image_list = JSON.parse(listing.image_list) })
        const header = req.user ? 'private-header' : 'public-header'
        const msg = req.query.msg || null
        res.render("pages/listing", 
          {
            title: "Listings",
            css: "listings.css",
            label: "search",
            header: header,
            category: responses[0].data,
            province: responses[1].data,
            message: msg,
            listings: responses[2].data,
            search: req.body.keyword,
          }); 
        // res.status(200).send(response.data); //testing purpose
      })
        .catch((err) => {
        console.log("Error:", err.message);
        res.status(500).send("oops, something is wrong");
      })
    } catch(err) {
        res.status(400).send('Bad request'+ err.message)
    }
  });

  return router;
}