// const express = require('express');
const { port, entry } = require('./globals');
const jwt = require("./utilities/jwt");
const server = require('./app')(jwt);

// server.get( '/', (req,res) => res.sendFile( entry ) )

server.listen( port, () => console.log( `\nServer live at http://localhost:${port}` ) )
