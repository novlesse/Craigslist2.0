const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require("body-parser")

module.exports = function(jwt) {
  const publicRouter = require('./routes/public')({ authenticate: jwt.authenticateJWT, generateAccessToken: jwt.generateAccessToken})
  const usersRouter = require('./routes/users')({authenticate: jwt.authenticateJWT, generateAccessToken: jwt.generateAccessToken})

  // Serve up the static front end code and image uploads
  app.use(express.static(path.join(__dirname, 'public')))
  
  app.set('view engine', 'ejs');
  app.use(bodyParser.json());
  app.use(express.urlencoded({extended: false}))
  app.use(express.json())

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