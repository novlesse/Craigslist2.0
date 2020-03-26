const express = require("express"),
      app = express(),
      bodyParser = require("body-parser");

module.exports = (database) => {
    const dbQuery = require("./query")(database);
    app.use("/", dbQuery);
    
    app.use(express.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    return app;
};
