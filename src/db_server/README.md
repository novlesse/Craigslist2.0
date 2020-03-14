# Remote DB server Access Instruction

## URL: http://99.79.9.84:8080/

## Endpoints

***"/users" method:get***
- get all the user lists
```javascript
router.get("/users", async (req, res) => {
    connection.query("SELECT username, firstname, lastname, email, house_num, street, city, province_code, country_code, postcode FROM user", (err, rows) => {
        if (err) {
            console.log(`Query not run`);
        } else {
            res.status(200).send(rows);
        }
    });
});
```

***"/user/:id" method:get***
- find user by given id
```javascript
    router.get("/user/:id", async (req, res) => {
        connection.query(`SELECT username, firstname, lastname, email, house_num, street, city, province_code, country_code, postcode FROM user WHERE id=${req.params.id}`, (err, rows) => {
            if (err) {
                console.log(`Query not run`);
            } else {
                res.status(200).send(rows);
            }
        });
    });
```

***"/user/:username" method:get***
- find user by given username & verify username is available
```javascript
    router.get("/user/:username", async (req, res) => {
        connection.query(`SELECT username, firstname, lastname, email, house_num, street, city, province_code, country_code, postcode FROM user WHERE username=${req.params.username}`, (err, rows) => {
            if (err) {
                console.log(`Query not run`);
            } else {
                res.status(200).send(rows);
            }
        });
    });
```

***"/user/:email" method:get***
- find user by email & verify email is available
```javascript
    router.get("/user/:email", async (req, res) => {
        connection.query(`SELECT firstname, lastname, email, house_num, street, city, province_code, country_code, postcode FROM user WHERE email=${req.params.email}`, (err, rows) => {
            if (err) {
                console.log(`Query not run`);
            } else {
                res.status(200).send(rows);
            }
        });
    });
```

***"/user" method:post***
- signup a new user
```javascript
    router.post("/user", async (req, res) => {
        //to do
    });
```
- expecting parameters:
```json
//to do
```

***"/posts" method:get***
- list all posts detailed content
```javascript
    router.get("/posts", async (req, res) => {

        connection.query("SELECT * FROM post", (err, rows) => {
            if (err) {
                console.log(`Query not run`);
            } else {
                res.status(200).send(rows);
            }
        });
    });
```

***"/post/:seller_id" method:get***
- list all posts of given seller id
```javascript
    router.get("/posts/:seller_id", async (req, res) => {

        connection.query(`SELECT * FROM post where seller=${req.params.seller_id}`, (err, rows) => {
            if (err) {
                console.log(`Query not run`);
            } else {
                res.status(200).send(rows);
            }
        });
    });
```

***"/post" method:post***
- insert a new post
```javascript
    router.post("/post", async (req, res) => {
        //to do
    });
```
- expecting parameters:
```json
//to do
```

***"/category" method:get***
- get all category and sub_category lists
```javascript
    router.get("/category", async (req, res) => {
        connection.query("SELECT * FROM all_category", ( err, rows) => {
            if (err) {
                console.log(`Query not run`);
            } else {
                res.status(200).send(rows);
            }
        });
    });
```

***"/images/:post_id" method:get***
- get all images of a given post
```javascript
    router.get("/images/:post_id", async (req, res) => {
        connection.query(`SELECT * FROM image_list where post_id = ${req.params.post_id}`, (err, rows) => {
            if (err) {
                console.log(`Query not run`);
            } else {
                res.status(200).send(rows);
            }
        });
    });
```    

***"/incoming_transaction/:user_id" method:get***
- get a user's all incoming transactions
```javascript
    router.get("/incoming_transaction/:user_id", async(req, res) => {
        //to do
    });
```

***"/incoming_transaction/:user_id" method:post***
- insert an incoming transaction by given user
```javascript
    router.post("/incoming_transaction/:user_id", async(req, res) => {
        //to do
    });
```
- expecting parameters:
```json
//to do
```

***"/outgoing_transaction/:user_id" method:get***
- get a user's all outgoing transaction
```javascript
    router.get("/outgoing_transaction/:user_id", async(req, res) => {
        //to do
    });
```

***"/outgoing_transaction/:user_id" method:post***
- insert a user's all outgoing transaction 
```javascript
    router.get("/outgoing_transaction/:user_id", async(req, res) => {
        //to do
    });
```
- expecting parameters:
```json
//to do
```