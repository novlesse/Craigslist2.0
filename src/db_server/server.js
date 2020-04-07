const database = require("../database/DB");
const app = require("./app")(database);
const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`\nServer running at ${port}`);
});