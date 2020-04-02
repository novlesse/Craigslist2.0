const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();

// Load User model
const User = require("../models/User");
const {
    forwardAuthenticated
} = require('../config/auth');

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) => res.render("register"));

// Register Handle
router.post("/register", (req, res) => {
    const {
        name,
        email,
        password,
        password2
    } = req.body;

    let errors = [];

    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({
            msg: "Please enter all fields."
        });
    }

    // Check if passwords match
    if (password != password2) {
        errors.push({
            msg: "Passwords do not match."
        });
    }

    // Check minimum password length
    if (password.length < 6) {
        errors.push({
            msg: "Password must be at least 6 characters."
        });
    }

    // Validation
    if (errors.length > 0) {
        res.render("register", {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({
            email: email
        }).then(user => {
            if (user) {
                errors.push({
                    msg: "Email is already registered."
                });
                res.render("register", {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // Hash password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash("success_msg", "You are now registered.");
                                res.redirect("/users/login");
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// Login
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: "Missing credentials."
    })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "You are now logged out.");
    res.redirect("/users/login");
});

module.exports = router;