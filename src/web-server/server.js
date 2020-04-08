const server = require('./app')();
const port = process.env.PORT || 5000
require('dotenv').config()

server.listen(port, () => console.log(`\nServer live at http://localhost:${port}`))