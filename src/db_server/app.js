const express = require("express"),
      app = express(),
      path = require("path");
      
module.exports = (database) => {
    const dbQuery = require("./query")(database),
          sheetRouter = require("./route/sheet_router")(database); 
    app.set('view engine', 'ejs');
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(express.static(path.join(__dirname, "../public")));
    app.use("/sheet", sheetRouter);
    app.use("/db", dbQuery);
    return app;
};
