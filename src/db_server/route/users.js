const express = require("express");
const router = express.Router();
const axios = require("axios");

// module.exports = function(db) {

//     router.get("/images", (req, res) => {
        
//         .then(data => {
//             console.log(data.data);
//             res.render('index_sheet', {data:data.data})
//         })
//         .catch(err => {res.send('error')})
//     });

//     return router;
// }