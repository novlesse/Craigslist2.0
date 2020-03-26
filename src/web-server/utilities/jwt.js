const jwt = require("jsonwebtoken")

module.exports = () => {
    const authenticateJWT = (req, res, next) => {
        // next(); return
        const authHeader = req.headers.authorization
        if (!authHeader) {
          res.sendStatus(401)
          return 
        }
      
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
          if (err) {
            res.sendStatus(403)
            return 
          }
          req.user = user
          next()
        })
      }

      const  generateAccessToken = (user) => {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1000000000s" })
      }
}
