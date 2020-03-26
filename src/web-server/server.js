const express = require('express');
const { port, entry } = require('./globals');
const server = express();

server.get( '/', (req,res) => res.sendFile( entry ) )

server.listen( port, () => console.log( `\nServer live at http://localhost:${port}` ) )
