// const { port, entry } = require('./globals');

const server = require('./app')();
const port = process.env.PORT || 5000

server.listen(port, () => console.log(`\nServer live at http://localhost:${port}`))