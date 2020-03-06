const express = require('express');
const { port, entry } = require('./globals');
const server = express();

const ejs = require("ejs");
const axios = require("axios");

server.get( '/', (req,res) => res.sendFile( entry ) )

server.listen( port, () => console.log( `\nServer live at http://localhost:${port}` ) )
