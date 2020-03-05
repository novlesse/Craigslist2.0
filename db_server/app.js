const express = require("express"),
    app = express();

module.exports = (database) => {
    const dbQuery = require("./query")(database);
    app.use("/", dbQuery);

    return app;
};
