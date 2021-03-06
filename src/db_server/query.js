const express = require("express");
const router = express.Router();

module.exports = function (db) {
    const connection = db();
    router.get("/", (req, res) => {
        res.status(200).send("<h1>welcome</h1>")
    })

    //get all the user lists
    router.get("/users", async (req, res) => {
        connection.query("SELECT * FROM view_user_detail", (err, rows) => {
            if (err) {
                console.log(`Query not run`);
                res.status(500).send(err.message);

            } else {
                // console.log(rows);
                res.status(200).send(rows);
            }
        });
    });

    //find user by id
    router.get("/users/:id", async (req, res) => {
        connection.query(`SELECT * FROM view_user_detail WHERE id=?`,
            [req.params.id],
            (err, rows) => {
                if (err) {
                    console.log(`Query not run`);
                    res.status(500).send(err.message);

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

                } else {
                    // console.log(rows);
                    res.status(200).send(rows);
                }
            });
    });

    //find user by email & verify email is available
    router.get("/users/email/:email", async (req, res) => {
        connection.query(
            `SELECT * FROM user WHERE email=?`,
            [req.params.email],
            (err, rows) => {
                if (err) {
                    console.log(`Query not run`);
                    res.status(500).send(err.message);

                } else {
                    res.status(200).send(rows);
                }
            });
    });

    //create a new user
    router.post("/users", async (req, res) => {
        req.body.is_verified = req.body.is_verified ? req.body.is_verified : false;
        req.body.payment_account = req.body.payment_account ? req.body.payment_account : null;
        console.log(req.body)
        connection.query(
            ` INSERT INTO user
              SET ?
            `,
            [req.body],
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
        keys.forEach((key, index) => {
            params += `${key} = ${values[index]}`
            params += index === (len - 1) ? '' : ','
        })
        connection.query(
            ` UPDATE user
              SET ?
              WHERE id=?
            `,
            [params, req.body.id],
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

            } else {
                res.status(200).send(rows);
            }
        });
    });

    router.get("/addr/:user_id", async (req, res) => {
        connection.query(`SELECT house_num, street, city, province_code, postcode FROM user where id=? `,
        [req.params.user_id],
        (err, rows) => {
            if (err) {
                console.log(`Query not run`);
                res.status(500).send(err.message);

            } else {
                res.status(200).send(rows);
            }
        });
        
    })
    //list a post details of given post_id
    router.get("/posts/:post_id", async (req, res) => {
        connection.query(`SELECT * FROM view_post_detail where post_id=? `,
            [req.params.post_id],
            (err, rows) => {
                if (err) {
                    console.log(`Query not run`);
                    res.status(500).send(err.message);

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

                } else {
                    res.status(200).send(rows);
                }
            });
    });

    //search posts by category & keywords
    router.post("/posts/search", async (req, res) => {
        req.body.category_id = req.body.category_id? req.body.category_id:null
        req.body.sub_category_id = req.body.sub_category_id? req.body.sub_category_id:null
        req.body.keyword = req.body.keyword? req.body.keyword:null
            connection.query(
                `SELECT * FROM view_post_detail 
                WHERE CASE WHEN ? IS NOT NULL THEN category_id = ? ELSE 1=1 END
                AND CASE WHEN ? IS NOT NULL THEN sub_category_id = ? ELSE 1=1 END
                AND CASE WHEN ? IS NOT NULL THEN (LOWER(\`post_title\`) LIKE CONCAT('%' , ?, '%')
                    OR LOWER(\`post_description\`) LIKE CONCAT('%' , ?, '%')) ELSE 1=1 END`,
            [req.body.category_id, req.body.category_id, req.body.sub_category_id, req.body.sub_category_id, req.body.keyword, req.body.keyword, req.body.keyword],
            (err, rows) => {
                if (err) {
                    console.log(`Query not run`);
                    res.status(500).send(err.message);

                } else {
                    res.status(200).send(rows);
                }
            });
    });

    //create a new post (seller, title, description, price, item_condition_id, category_id, sub_category_id)
    router.post("/posts", async (req, res) => {
        const images = JSON.parse(req.body.images);
        delete req.body.images;
        console.log(req.body);
        req.body.description = req.body.description ? req.body.description : null;

        connection.query(
            `INSERT INTO post 
             SET ? 
            `,
            [req.body],
            (err, result) => {
                if (err) {
                    connection.rollback(() => {
                        console.log("did not insert into posting");
                        res.status(500).send(err.message);
                    });
                    console.log(`Query not run`);
                } else {
                    const values = [];
                    images.forEach(image => {
                        values.push([result.insertId, image]);
                    })
                    console.log(values)
                    connection.query(
                        'INSERT INTO image_list (post_id, images_link) VALUES ?',
                        [values],
                        (err, result) => {
                            if (err) {
                                connection.rollback(() => {
                                    console.log("did not insert into image")
                                    throw err;
                                });
                            }
                            connection.commit(() => {
                                if (err) {
                                    connection.rollback(() => {
                                        throw err;
                                    });
                                }
                                console.log("successfully created posting with image");
                                res.status(200).send(result);
                            });
                        });
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
        connection.query("SELECT * FROM view_all_category", (err, rows) => {
            if (err) {
                console.log(`Query not run`);
                res.status(500).send(err.message);

            } else {
                res.status(200).send(rows);
            }
        });
    });

    //get province lists
    router.get("/province", async (req, res) => {
        connection.query("SELECT code FROM province", (err, rows) => {
            if (err) {
                console.log(`Query not run`);
                res.status(500).send(err.message);

            } else {
                res.status(200).send(rows);
            }
        });
    })

    //get item condition list
    router.get("/condition", async (req, res) => {
        connection.query("SELECT * FROM item_condition", ( err, rows) => {
            if (err) {
                console.log(`Query not run`);
                res.status(500).send(err.message);

            } else {
                res.status(200).send(rows);
            }
        });
    })

    //get item condition list
    router.get("/condition", async (req, res) => {
        connection.query("SELECT * FROM item_condition", (err, rows) => {
            if (err) {
                console.log(`Query not run`);
                res.status(500).send(err.message);
            } else {
                res.status(200).send(rows);
            }
        });
    });

    //get all images of a given post
    router.get("/images/:post_id", async (req, res) => {
        connection.query(`SELECT * FROM image_list where post_id = ?`,
            [req.params.post_id],
            (err, rows) => {
                if (err) {
                    console.log(`Query not run`);
                    res.status(500).send(err.message);

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
                    connection.query('DELETE FROM `post` WHERE `id`=?',
                        [req.params.post_id],
                        (error, results, fields) => {
                            if (error) {
                                console.log("Fail to delete related post when image inserting failure", err.message)
                            };

                        });
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
              SET ?
              WHERE image_id =?
            `,
            [req.body.image, req.params.image_id],
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

    //get rating of a given user
    router.get("/ratings/:user_id", async (req, res) => {
        connection.query(
            "SELECT * FROM view_rating_list WHERE ratee=?",
            [req.params.user_id],
            (err, rows) => {
                if (err) {
                    console.log(`Query not run`);
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send(rows);
                }
            });
    })

    //post a new rating of a given user
    router.post("/ratings", async (req, res) => {
        req.body.description = req.body.description ? req.body.description : null
        connection.query(
            ` INSERT INTO rating
              SET ?
            `,
            [req.body],
            (err, result) => {
                if (err) {
                    console.log(`Query not run`);
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send(result);
                }
            });
    })
    //get a user's all incoming transactions
    router.get("/incoming_transaction/:user_id", async (req, res) => {
        // to do
    });

    //insert an incoming transaction by given user
    router.post("/incoming_transaction/:user_id", async (req, res) => {
        // to do
    });

    //update an incoming transaction by given transaction id
    router.put("/incoming_transaction/:transaction_id", async (req, res) => {
        // to do
    });

    //get a user's all outgoing transaction
    router.get("/outgoing_transaction/:user_id", async (req, res) => {
        // to do
    });

    //insert a user's all outgoing transaction 
    router.get("/outgoing_transaction/:user_id", async (req, res) => {
        // to do
    });

    //update a user's all outgoing transaction 
    router.put("/outgoing_transaction/:user_id", async (req, res) => {
        // to do
    });

    //get all bid by given post_id 
    router.get("/biding/:post_id", async (req, res) => {
        connection.query(`SELECT * FROM biding where post_id = ? ORDER BY bid DESC`,
            [req.params.post_id],
            (err, rows) => {
                if (err) {
                    console.log(`Query not run`);
                    res.status(500).send(err.message);
                } else {
                    res.status(200).send(rows);
                }
            });
    });

    return router;
}
