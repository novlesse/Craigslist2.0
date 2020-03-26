const database = require("../database/DB");
const express = require("express");
const app = require("./app")(database);
const port = process.env.PORT || 3306;

const connection = require("../database/DB");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.render("pages/index")
});

app.get("/test", (req, res) => {
	res.render("pages/test")
});

app.post("/signup", async (req, res) => {
	let signup = {
		username: req.body.username,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: req.body.password, 
		house_num: req.body.housenumber,
		street: req.body.street,
		city: req.body.city,
		province_code: req.body.province.toUpperCase(),
		postcode: req.body.postalcode,
		country_code: req.body.country.toUpperCase()
	};
	// console.log(signup);
	connection.query("INSERT INTO user SET ?", signup, (err, success) => {
		if (err) {
			console.log("Error:", err);
		} else {
			console.log(signup);
			res.render("pages/index", {
				user: signup
			});
		}
	});
});

app.post("/search", async (req, res) => {
	let search = req.body.product;
	if (search.length == 0 || search == " ") {
		search = null;
	}
	console.log(search);
	connection.query(`SELECT * FROM post 
	  JOIN image_list ON post.image_list_id = image_list.id 
	  WHERE title LIKE ?`, [ "%" + search + "%"], (err, listings) => {
		if (err) {
			console.log("Error:", err);
		} else {
			// let listings = rows
			console.log(listings)

			res.render("pages/listing", {
				listings: listings,
				search: search
			});
		}
	});
});

app.post("/postlisting", async (req, res) => {
	let listing = {
		title: req.body.title,
		price: req.body.price,
		item_condition_id: req.body.condition,
		category_id: req.body.category,
		sub_category_id: req.body.subCategory,
		description: req.body.description
	};
	let listingImage = {
		images_link: req.body.testImage
	} ;
	connection.beginTransaction((err) => {
		if (err) {
			console.log("transaction did not begin");
			throw err;
		}
		connection.query("INSERT INTO post SET ?", listing, (err, success) => {
			if (err) {
				connection.rollback(() => {
					console.log("did not insert into posting");
					throw err;
				});
			}
			connection.query("INSERT INTO image_list SET ?", listingImage, (err, success) => {
				console.log(listingImage)
				if (err) {
					connection.rollback(() => {
						console.log("did not insert into image")
						throw err;
					});
				}
				connection.query(`UPDATE post SET image_list_id = (SELECT id FROM image_list WHERE image_list.images_link = ?)`, req.body.testImage, (err, success) => {
					if (err) {
						connection.rollback(() => {
							console.log("Could not update id's");
							throw err;
						}) ;
					}
					connection.commit(() => {
						if (err) {
							connection.rollback(() => {
								throw err;
							});
						}
						console.log(listing)
						res.render("pages/index", {
							listing: listing
						});
						console.log("successfully created posting with image");
						// connection.end();
					});
				});

			});
		});
	});

});

app.listen(port, () => {
	console.log(`\nServer running at ${port}`);
});
