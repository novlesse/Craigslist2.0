const database = require("../database/DB");
const app = require("./app")(database);
const port = process.env.PORT || 3306;

app.listen(port, () => {
	console.log(`\nServer live at http://localhost:${port}`);
});
