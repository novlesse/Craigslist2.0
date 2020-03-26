const express = require("express"),
    app = express();


module.exports = (database) => {
    const dbQuery = require("./query")(database);
    app.use("/", dbQuery);
    app.set('view engine', 'ejs');
    const bodyParser = require("body-parser");
    app.use(express.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(express.static(__dirname + "/../../../CSS"));
    console.log(__dirname)
    return app;
};
