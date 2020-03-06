const database = require("../database/DB");
const express = require("express");
const app = require("./app")(database);
const port = process.env.PORT || 3306;

const connection = require("../database/DB");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.get("/listing", (req, res) => {
	res.sendFile("./listings.html", {root: __dirname + "../../../HTML"})
});

app.post("/search", async (req, res) => {
	let search = req.body.product;
	if (search.length == 0 || search == " ") {
		search = null;
	}
	console.log(search);
	connection.query(`SELECT * FROM post 
	  JOIN image_list ON post.image_list_id = image_list.id 
	  WHERE title LIKE ?`, [ "%" + search + "%"], (err, rows) => {
		if (err) {
			console.log("Error:", err);
		} else {
			let listings = rows
			console.log(listings)

			res.render("pages/listing", {
				listings: listings,
				search: search
			});
		}
	});
});

app.listen(port, () => {
	console.log(`\nServer live at http://localhost:${port}`);
});
