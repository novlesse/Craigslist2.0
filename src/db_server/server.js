const database = require("../database/DB");
const app = require("./app")(database);
const port = process.env.PORT || 3300;

app.listen(port, () => {
	console.log(`Server running at ${port}`);
});
