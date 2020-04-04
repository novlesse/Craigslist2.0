const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const passport = require("passport")
const session = require('express-session')

module.exports = function() {
  const publicRouter = require('./routes/public')()
  
  const usersRouter = require('./routes/users')()

  // Serve up the static front end code and image uploads
  app.use(express.static(path.join(__dirname, 'public')))
  
  app.set('view engine', 'ejs');
  app.use(bodyParser.json());
  app.use(express.urlencoded({extended: true}))
  app.use(express.json())
  
  // Express session
  app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true
    })
  );

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  // Route
  app.use('/', publicRouter)
  app.use('/api/users', usersRouter)
  
  // Create a generic error function for development
  app.use((req, res, next) => {
    res.sendGenericServerError = () => {
      res.statusCode = 500
      res.send({errors: ['🤷‍♂️']})
    }
    next()
  })
  return app
}