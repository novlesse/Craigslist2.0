const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const axios = require("axios");
const urlbase = "http://99.79.9.84:8080";

module.exports = function (passport) {
  passport.use('local',
    new LocalStrategy({
      usernameField: "email"
    }, function(email, password, done) {
      // Match user
      let user = {};
      axios.get(`${urlbase}/users/email/${email}`)
      .then((response) => {
        if (response.data) {
          user = response.data[0]
          userPW = response.data[0].password
        } else {
          console.log("no response")
          return done(null, false, {
            message: "Email or password is incorrect"
          });
        }

        bcrypt.compare(password, userPW, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            console.log("match")
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Email or password is incorrect."
            });
          }
        })
      }).catch(err => console.log(err));
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    let user = {}
    axios.get(`${urlbase}/users/${id}`)
      .then((response) => {
        if (response.data) {
          user = response.data[0]
          if(user)
          done(null, user)
        } else {
          done (err, null)
        }
    });
  });
}; 