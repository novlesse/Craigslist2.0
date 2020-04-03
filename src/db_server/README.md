# Remote DB server Access Instruction

## URL: http://99.79.9.84:8080/

## Endpoints

***"/users" method:get***
- get all the user lists
>response
```json
[
    {
        "id": 1,
        "username": "FlyingDuck",
        "firstname": "Jim",
        "lastname": "Davis",
        "email": "jim@test.com",
        "password": "test",
        "house_num": "473",
        "street": "4567 Canada Way",
        "city": "Burnaby",
        "province_code": "BC",
        "postcode": "V5G 4T1",
        "country_code": "CA",
        "is_verified": 0,
        "payment_account": null,
        "created_at": "2020-03-11T11:24:30.000Z",
        "average_rating": 2.6667,
        "total_rating": 3
    },
    {
        "id": 2,
        "username": "Wowooo",
        "firstname": "Sam",
        "lastname": "Brown",
        "email": "sam@test.com",
        "password": "test",
        "house_num": "453",
        "street": "West 12th Avenue",
        "city": "Vancouver",
        "province_code": "BC",
        "postcode": "V5Y 1V4",
        "country_code": "CA",
        "is_verified": 0,
        "payment_account": null,
        "created_at": "2020-03-11T11:24:30.000Z",
        "average_rating": 3.3333,
        "total_rating": 3
    },
]

```

***"/users/:id" method:get***
- find user by given id
> request: "/users/1
response
```json
[
    {
        "id": 1,
        "username": "FlyingDuck",
        "firstname": "Jim",
        "lastname": "Davis",
        "email": "jim@test.com",
        "password": "test",
        "house_num": "473",
        "street": "4567 Canada Way",
        "city": "Burnaby",
        "province_code": "BC",
        "postcode": "V5G 4T1",
        "country_code": "CA",
        "is_verified": 0,
        "payment_account": null,
        "created_at": "2020-03-11T11:24:30.000Z",
        "average_rating": 2.6667,
        "total_rating": 3
    }
]
```

***"/users/username/:username" method:get***
- find user by given username & verify username is available
> request: "/users/username/Wowooo
response
```JSON
request:
[
    {
        "id": 2,
        "username": "Wowooo",
        "firstname": "Sam",
        "lastname": "Brown",
        "email": "sam@test.com",
        "password": "test",
        "house_num": "453",
        "street": "West 12th Avenue",
        "city": "Vancouver",
        "province_code": "BC",
        "postcode": "V5Y 1V4",
        "country_code": "CA",
        "is_verified": 0,
        "payment_account": null,
        "created_at": "2020-03-11T11:24:30.000Z",
        "average_rating": 3.3333,
        "total_rating": 3
    }
]
```

***"/users/email/:email" method:get***
- find user by email & verify email is available
>request: /users/email/kevin@test.com
response
```JSON
[
    {
        "id": 3,
        "username": "user3",
        "firstname": "Kelly",
        "lastname": "Davis",
        "email": "kelly@test.com",
        "password": "test",
        "house_num": "4300",
        "street": "Kingsway",
        "city": "Burnaby",
        "province_code": "BC",
        "postcode": "V5H 1Z8",
        "country_code": "CA",
        "is_verified": 0,
        "payment_account": null,
        "created_at": "2020-03-26T03:00:16.000Z",
        "average_rating": 5,
        "total_rating": 3
    }
]
```

***"/user" method:post***
- Create a new user
>request body format:
```JSON
{   
    "username":"user5",
    "firstname":"Lily",
    "lastname":"Jim",
    "email":"lily@test.com",
    "password":"test",
    "house_num":2,
    "street":"9718 161A St",
    "city":"Surrey",
    "province_code":"BC",
    "country_code":"CA",
    "postcode":"V5H 6S7",
    "is_verified": true, //optional default value false
    "payment_account": "############" //optional default value null
}

```
***"/user" method:put***
- update user"s profile
```javascript
    
        //to do
    
```
- example parameters:
```json
{
    "id":1,
    "username":"newname",
    "house_num":12
}
```
***"/user" method:post***
- signup a new user
- expecting parameters:
```json
{
    "username":"",
    "firstname":"",
    "lastname":"",
    "email":"",
    "password":"",
    "house_num":"",
    "street":"",
    "city":"",
    "province_code":"",
    "postcode":"",
    "country_code":"",
    //optional, default value is False
    "is_verified":"", 
    //optional
    "payment_account":""
}
```

***"/posts" method:get***
- list all posts detailed content
>response  
```JSON
[
    {
        "post_id": 1,
        "post_title": "shelf",
        "post_description": null,
        "post_price": 45,
        "seller": 1,
        "item_condition": "new",
        "category_id": 2,
        "category_name": "furnitures",
        "sub_category_id": 4,
        "sub_category_name": "office",
        "created_at": "2020-03-26T07:19:03.000Z",
        "is_active": 1,
        "user_id": 1,
        "username": "FlyingDuck",
        "average_rating": 2.6667,
        "total_rating": 3,
        "image_list": "[\"https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\", \"https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\", \"https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\"]"
    },
    {
        "post_id": 2,
        "post_title": "drawing brush",
        "post_description": null,
        "post_price": 15,
        "seller": 1,
        "item_condition": "used",
        "category_id": 6,
        "category_name": "arts & crafts",
        "sub_category_id": 2,
        "sub_category_name": "drawing & painting",
        "created_at": "2020-03-26T07:19:03.000Z",
        "is_active": 1,
        "user_id": 1,
        "username": "FlyingDuck",
        "average_rating": 2.6667,
        "total_rating": 3,
        "image_list": "[\"https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\", \"https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\", \"https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\", \"https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\", \"https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500\"]"
    }
]
```

***"/post/:post_id" method:get***
- list a post details of given post_id
```Json
[
    {"post_id":1,
    "post_title":"shelf",
    "post_description":null,
    "post_price":45,
    "seller":1,
    "item_condition":"new",
    "category_id":2,
    "category_name":"furnitures",
    "sub_category_id":4,
    "sub_category_name":"office",
    "created_at":"2020-03-26T03:03:03.000Z",
    "is_active":1,
    "user_id":1,"username":"FlyingDuck",
    "average_rating":2.6667,
    "total_rating":3,
    "image_list":"[\"https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\", \"https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\", \"https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\"]"},
    
    {
        "post_id":2,
        "post_title":"drawing brush",
        "post_description":null,
        "post_price":15,
        "seller":1,
        "item_condition":"used",
        "category_id":6,
        "category_name":"arts & crafts",
        "sub_category_id":2,
        "sub_category_name":"drawing & painting",
        "created_at":"2020-03-26T03:03:03.000Z",
        "is_active":1,
        "user_id":1,
        "username":"FlyingDuck",
        "average_rating":2.6667,
        "total_rating":3,
        "image_list":"[\"https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\", \"https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\", \"https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\"]"}
]
```

***"/post/seller/:seller_id" method:get***
- list all posts of given seller id
```Json
{
    "post_id":2,
    "post_title":"drawing brush",
    "post_description":null,
    "post_price":15,
    "seller":1,
    "item_condition":"used",
    "category_id":6,
    "category_name":"arts & crafts",
    "sub_category_id":2,
    "sub_category_name":"drawing & painting",
    "created_at":"2020-03-26T03:03:03.000Z",
    "is_active":1,
    "user_id":1,
    "username":"FlyingDuck",
    "average_rating":2.6667,
    "total_rating":3,
    "image_list":"[\"https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\", \"https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\", \"https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260\"]"
}

```

***"/post" method:post***
- insert a new post
- expecting parameters:
```json
{
    "seller":3,
    "title":"iphone x",
    "price":400,
    "item_condition_id":2,
    "category_id":4,
    "sub_category_id":1,
    "images":["https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", "https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"]
}
```

***"/posts" method:put***
- update a post"s content
```
        //to do
    
```
- expecting parameters:
```json
{
    "id":"post_id",
    "title":"new-title",
    "price":"new-price"
}
```

***"/category" method:get***
- get all category and sub_category lists
response
```JSON
    [
    {
        "category_id": 1,
        "category_name": "appliance",
        "sub_categories": "[{\"sub_category_id\": 1, \"sub_category_name\": \"cooking\"}, {\"sub_category_id\": 2, \"sub_category_name\": \"Fridges\"}, {\"sub_category_id\": 3, \"sub_category_name\": \"Freezers\"}, {\"sub_category_id\": 4, \"sub_category_name\": \"dishwashers\"}, {\"sub_category_id\": 5, \"sub_category_name\": \"washers & dryers\"}, {\"sub_category_id\": 6, \"sub_category_name\": \"microwaves\"}, {\"sub_category_id\": 7, \"sub_category_name\": \"small appliances\"}, {\"sub_category_id\": 8, \"sub_category_name\": \"others\"}]"
    },
    {
        "category_id": 2,
        "category_name": "furnitures",
        "sub_categories": "[{\"sub_category_id\": 1, \"sub_category_name\": \"living room\"}, {\"sub_category_id\": 2, \"sub_category_name\": \"dining room\"}, {\"sub_category_id\": 3, \"sub_category_name\": \"bedroom\"}, {\"sub_category_id\": 4, \"sub_category_name\": \"office\"}, {\"sub_category_id\": 5, \"sub_category_name\": \"lightings\"}, {\"sub_category_id\": 6, \"sub_category_name\": \"outdoor\"}, {\"sub_category_id\": 7, \"sub_category_name\": \"others\"}]"
    },
    {
        "category_id": 3,
        "category_name": "computers & parts",
        "sub_categories": "[{\"sub_category_id\": 1, \"sub_category_name\": \"laptops\"}, {\"sub_category_id\": 2, \"sub_category_name\": \"desktops\"}, {\"sub_category_id\": 3, \"sub_category_name\": \"monitors\"}, {\"sub_category_id\": 4, \"sub_category_name\": \"accessories\"}, {\"sub_category_id\": 5, \"sub_category_name\": \"core components\"}, {\"sub_category_id\": 6, \"sub_category_name\": \"storage devices\"}, {\"sub_category_id\": 7, \"sub_category_name\": \"others\"}]"
    },
    {
        "category_id": 4,
        "category_name": "electronics",
        "sub_categories": "[{\"sub_category_id\": 1, \"sub_category_name\": \"cellphones\"}, {\"sub_category_id\": 2, \"sub_category_name\": \"TV & Videos\"}, {\"sub_category_id\": 3, \"sub_category_name\": \"tablets\"}, {\"sub_category_id\": 4, \"sub_category_name\": \"digital cameras\"}, {\"sub_category_id\": 5, \"sub_category_name\": \"musical instruments\"}, {\"sub_category_id\": 6, \"sub_category_name\": \"others\"}]"
    },
    {
        "category_id": 5,
        "category_name": "sports & fitness",
        "sub_categories": "[{\"sub_category_id\": 1, \"sub_category_name\": \"exercise\"}, {\"sub_category_id\": 2, \"sub_category_name\": \"camping\"}, {\"sub_category_id\": 3, \"sub_category_name\": \"winter sports\"}, {\"sub_category_id\": 4, \"sub_category_name\": \"water sports\"}, {\"sub_category_id\": 5, \"sub_category_name\": \"golf\"}, {\"sub_category_id\": 6, \"sub_category_name\": \"others\"}]"
    },
    {
        "category_id": 6,
        "category_name": "arts & crafts",
        "sub_categories": "[{\"sub_category_id\": 1, \"sub_category_name\": \"jewellery\"}, {\"sub_category_id\": 2, \"sub_category_name\": \"drawing & painting\"}, {\"sub_category_id\": 3, \"sub_category_name\": \"frame\"}, {\"sub_category_id\": 4, \"sub_category_name\": \"sewing\"}, {\"sub_category_id\": 5, \"sub_category_name\": \"kniting\"}, {\"sub_category_id\": 6, \"sub_category_name\": \"others\"}]"
    },
    {
        "category_id": 7,
        "category_name": "others",
        "sub_categories": "[{\"sub_category_id\": 1, \"sub_category_name\": \"garden supplies\"}, {\"sub_category_id\": 2, \"sub_category_name\": \"babies & kids\"}, {\"sub_category_id\": 3, \"sub_category_name\": \"beauty\"}, {\"sub_category_id\": 4, \"sub_category_name\": \"health\"}, {\"sub_category_id\": 5, \"sub_category_name\": \"others\"}]"
    }
]
```

***"/images/:post_id" method:get***
- get all images of a given post
>request: /images/2
response
```JSON
[
    {
        "id": 4,
        "post_id": 2,
        "images_link": "https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        "id": 5,
        "post_id": 2,
        "images_link": "https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        "id": 6,
        "post_id": 2,
        "images_link": "https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        "id": 9,
        "post_id": 2,
        "images_link": "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
        "id": 10,
        "post_id": 2,
        "images_link": "https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    }
]
```

***"/images/:post_id" method:post***
- post all images of a given post
>request /images/3
response
```json
{
    "images":[]
}
```

***"/ratings/:user_id" method:get***
- get ratings of a given user
>request /ratings/2
response
```json
{
    [
    {
        "stars": 4,
        "ratee": 2,
        "username": "FlyingDuck",
        "title": "great service",
        "description": null,
        "created_at": "2020-03-26T07:19:03.000Z"
    },
    {
        "stars": 2,
        "ratee": 2,
        "username": "user3",
        "title": "terrible",
        "description": null,
        "created_at": "2020-03-26T07:19:03.000Z"
    },
    {
        "stars": 4,
        "ratee": 2,
        "username": "user4",
        "title": "Ok",
        "description": null,
        "created_at": "2020-03-26T07:19:03.000Z"
    }
]
}
```
***"/ratings/" method:post***
- post a ratings
- expecting parameters:
```JSON
{
    "stars":5,
    "rater":1,
    "ratee":3,
    "title":"very satisfied",
    //optional
    "description":""
}
```

***"/incoming_transaction/:user_id" method:get***
- get a user"s all incoming transactions
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
{
    "amount":"",
    "sender":"user_id",
    "post_id":"",
    "account_num":"",
    //1 for bidding and 2 for on hold to seller
    "trans_status_id":""
}
```

***"/outgoing_transaction/:user_id" method:get***
- get a user"s all outgoing transaction
```javascript
    router.get("/outgoing_transaction/:user_id", async(req, res) => {
        //to do
    });
```

***"/outgoing_transaction/:user_id" method:post***
- insert a user"s all outgoing transaction 
```javascript
    router.get("/outgoing_transaction/:user_id", async(req, res) => {
        //to do
    });
```
- expecting parameters:
```json
{
    "amount":"",
    "receiver":"user_id",
    "incoming_transaction_id":"",
    "account_num":"",
    //4 for refund and 5 for release payment to seller
    "trans_status_id":""
}
```
