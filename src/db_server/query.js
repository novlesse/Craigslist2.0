const express = require("express");
const router = express.Router();

module.exports = function(db) {
    const connection = db();
    router.get("/", (req,res)=>{
        res.status(200).send("<h1>welcome</h1>")
    })

    //get all the user lists
    router.get("/users", async (req, res) => {
        connection.query("SELECT * FROM view_user_detail", (err, rows) => {
            if (err) {
                console.log(`Query not run`); 
                res.status(500).send(err.message);
                // throw err;
            } else {
                // console.log(rows);
                res.status(200).send(rows);
            }
        });
    });

    //find user by id
    router.get("/users/:id", async (req, res) => {
        connection.query(`SELECT * FROM view_user_detail WHERE id=${req.params.id}`, (err, rows) => {
            if (err) {
                console.log(`Query not run`); 
                res.status(500).send(err.message);
                // throw err;
            } else {
                // console.log(rows);
                res.status(200).send(rows);
            }
        });
    });

    //find user by username
    router.get("/users/username/:username", async (req, res) => {
        connection.query(`SELECT * FROM view_user_detail WHERE username=?`,
        [req.params.username], 
        (err, rows) => {
            if (err) {
                console.log(`Query not run`); 
                res.status(500).send(err.message);
                // throw err;
            } else {
                // console.log(rows);
                res.status(200).send(rows);
            }
        });
    });

     //find user by email & verify email is available
     router.get("/users/email/:email", async (req, res) => {
        connection.query(
            `SELECT * FROM view_user_detail WHERE email=?`,
            [req.params.email], 
            (err, rows) => {
                if (err) {
                    console.log(`Query not run`); 
                    res.status(500).send(err.message);
                    // throw err;
                } else {
                    res.status(200).send(rows);
                }
        });
    });

    //create a new user
    router.post("/users", async (req, res) => {
        req.body.isVerified = req.body.isVerified ? req.body.isVerified:false;
        req.body.payment_account = req.body.payment_account? req.body.payment_account:null;
        connection.query(
            ` INSERT INTO user
              SET ?
            `,
            req.body,
            (err, result) => {
                if (err) {
                    console.log(`Query not run`); 
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send(result);
                }
        });
    });

    //update user profile
    router.put("/users", async (req, res) => {
        const len = req.body.length;
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        let params = '';
        keys.forEach((key,index) => {
            params += `${key} = ${values[index]}`
            params += index === (len -1)? '':','
        })
        connection.query(
            ` UPDATE user
              SET ${params})
              WHERE id=?
            `,
            [req.body.id],
            (err, result) => {
                if (err) {
                    console.log(`Query not run`); 
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send(result);
                }
        });
    });

    // //delete a user
    // router.delete("/users/:id", async (req, res) => {
    //     //to do
    // });

    //list all posts with detailed content
    router.get("/posts", async (req, res) => {

        connection.query("SELECT * FROM view_post_detail", (err, rows) => {
            if (err) {
                console.log(`Query not run`); 
                res.status(500).send(err.message);
                // throw err;
            } else {
                res.status(200).send(rows);
            }
        });
    });

    //list all posts of given seller
    router.get("/posts/seller/:seller_id", async (req, res) => {
        connection.query(`SELECT * FROM view_post_detail where seller=? `,
            [req.params.seller_id],
            (err, rows) => {
                if (err) {
                    console.log(`Query not run`); 
                    res.status(500).send(err.message);
                    // throw err;
                } else {
                    res.status(200).send(rows);
                }
        });
    });

    //search posts by category & keywords
    router.get("/posts/search/:category_id", async (req, res) => {
        // to do
    });

    //search posts by category, sub_category & keywords
    router.get("/posts/search/:category_id", async (req, res) => {
        // to do
    });

    //search posts by keywords
    router.get("/posts/search/:keywords", async (req, res) => {
        // to do
    });

    //create a new post
    router.post("/posts", async (req, res) => {
        console.log(req.body);
        req.body.description = req.body.description? req.body.description:null;
        connection.query(
            `INSERT INTO post(seller, title, description, price, item_condition_id, category_id, sub_category_id) 
             VALUES(${req.body.seller}, ${req.body.title}, ${req.body.description}, ${req.body.price}, ${req.body.item_condition_id}, ${req.body.category_id}, ${req.body.sub_category_id})
            `,
            (err, result) => {
                if (err) {
                    console.log(`Query not run`); 
                    res.status(500).send(err.message);
                } else {
                    res.redirect(307 , `/images/${result.insertId}`)
                    // res.status(200).send(result);
                }
        });
    });

    //update a post
    router.put("/posts", async (req, res) => {
        //to do
    });

    //delete a post
    router.delete("/posts/:id", async (req, res) => {
        connection.query('DELETE FROM `post` WHERE `id`=?', [req.body.id], (error, results, fields) => {
            if (error) throw error;
            res.end('Record has been deleted!');
          });
    });

    //get all category and sub_category lists
    router.get("/category", async (req, res) => {
        connection.query("SELECT * FROM view_all_category", ( err, rows) => {
            if (err) {
                console.log(`Query not run`); 
                res.status(500).send(err.message);
                // throw err;
            } else {
                res.status(200).send(rows);
            }
        });
    });

    //get all images of a given post
    router.get("/images/:post_id", async (req, res) => {
        connection.query(`SELECT * FROM image_list where post_id = ${req.params.post_id}`, (err, rows) => {
            if (err) {
                console.log(`Query not run`); 
                res.status(500).send(err.message);
                // throw err;
            } else {
                res.status(200).send(rows);
            }
        });
    });

    //post images of a given post
    router.post("/images/:post_id", async (req, res) => {
        const images = JSON.parse(req.body.images);
        let values = [];
        images.forEach(image => {
            values.push([req.params.post_id, image]);
        })
        console.log(values)
        connection.query(
            'INSERT INTO image_list (post_id, images_link) VALUES ?',
            [values],
            (err, result) => {
                if (err) {
                    console.log(`Query not run`); 
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send(result);
                }
        });
        
    });
    
    //update images of a given post
    router.put("/images/:image_id", async (req, res) => {
        connection.query(
            ` UPDATE image_list
              SET ${req.body.image}
              WHERE image_id =?
            `,
            [req.params.image_id],
            (err, result) => {
                if (err) {
                    console.log(`Query not run`); 
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send(result);
                }
        });
    });

    //update images of a given post
    router.put("/images/:post_id", async (req, res) => {
        //to do
    });

    //get a user's all incoming transactions
    router.get("/incoming_transaction/:user_id", async(req, res) => {
        // to do
    });

    //insert an incoming transaction by given user
    router.post("/incoming_transaction/:user_id", async(req, res) => {
        // to do
    });

    //update an incoming transaction by given transaction id
    router.put("/incoming_transaction/:transaction_id", async(req, res) => {
        // to do
    });

    //get a user's all outgoing transaction
    router.get("/outgoing_transaction/:user_id", async(req, res) => {
        // to do
    });

    //insert a user's all outgoing transaction 
    router.get("/outgoing_transaction/:user_id", async(req, res) => {
        // to do
    });

    //update a user's all outgoing transaction 
    router.put("/outgoing_transaction/:user_id", async(req, res) => {
        // to do
    });

    //get all bid by given post_id 
    router.get("/biding/:post_id", async(req, res) => {
        connection.query(`SELECT * FROM biding where post_id = ${req.params.post_id} ORDER BY bid DESC`, (err, rows) => {
            if (err) {
                console.log(`Query not run`); 
                res.status(500).send(err.message);
                // throw err;
            } else {
                res.status(200).send(rows);
            }
        });
    });

    return router;
}