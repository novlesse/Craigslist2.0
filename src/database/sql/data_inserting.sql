
INSERT INTO
    province (code, `name`)
VALUES
( 'AB', 'Alberta' ),
( 'BC', 'British Columbia' ),
( 'MB', 'Manitoba' ),
( 'NB', 'New Brunswick' ),
( 'NL', 'Newfoundland and Labrador' ),
( 'NS', 'Nova Scotia' ),
( 'ON', 'Ontario' ),
( 'PE', 'Prince Edward Island' );

INSERT INTO
    country (code, `name`)
VALUES
( 'CA', 'Cananda' ),
( 'US', 'the United States of America' );

-- original password 'test; 
INSERT INTO
    user (username, firstname, lastname, email, `password`, house_num, street, city, province_code, postcode, country_code)
VALUES 
( 'FlyingDuck','Jim', 'Davis', 'jim@test.com', 'test', '473', '4567 Canada Way', 'Burnaby','BC','V5G 4T1', 'CA' ),
( 'Wowooo', 'Sam', 'Brown', 'sam@test.com', 'test', '453', 'West 12th Avenue', 'Vancouver','BC','V5Y 1V4', 'CA' );

INSERT INTO
    item_condition (name)
VALUES
( 'new' ),
( 'used' ),
( 'refurbished' ),
( 'open box' );

INSERT INTO
    category (id, `name`)
VALUES
( 1, 'appliance' ),
( 2, 'furnitures' ),
( 3, 'computers & parts' ),
( 4, 'electronics' ),
( 5, 'sports & fitness' ),
( 6, 'arts & crafts' ),
( 7, 'others' );

INSERT INTO
    sub_category (id, category_id, `name`)
VALUES
( 1, 1, 'cooking' ),
( 2, 1, 'Fridges' ),
( 3, 1, 'Freezers' ),
( 4, 1, 'dishwashers' ),
( 5, 1, 'washers & dryers' ),
( 6, 1, 'microwaves' ),
( 7, 1, 'small appliances' ),
( 8, 1, 'others'),
( 1, 2, 'living room'),
( 2, 2, 'dining room' ),
( 3, 2, 'bedroom' ),
( 4, 2, 'office' ),
( 5, 2, 'lightings' ),
( 6, 2, 'outdoor' ),
( 7, 2, 'others' ),
( 1, 3, 'laptops' ),
( 2, 3, 'desktops' ),
( 3, 3, 'monitors' ),
( 4, 3, 'accessories' ),
( 5, 3, 'core components' ),
( 6, 3, 'storage devices' ),
( 7, 3, 'others' ),
( 1, 4, 'cellphones' ),
( 2, 4, 'TV & Videos' ),
( 3, 4, 'tablets' ),
( 4, 4, 'digital cameras' ),
( 5, 4, 'musical instruments' ),
( 6, 4, 'others' ),
( 1, 5, 'exercise' ),
( 2, 5, 'camping' ),
( 3, 5, 'winter sports' ),
( 4, 5, 'water sports' ),
( 5, 5, 'golf' ),
( 6, 5, 'others' ),
( 1, 6, 'jewellery' ),
( 2, 6, 'drawing & painting' ),
( 3, 6, 'frame' ),
( 4, 6, 'sewing' ),
( 5, 6, 'kniting' ),
( 6, 6, 'others' ),
( 1, 7, 'garden supplies' ),
( 2, 7, 'babies & kids' ),
( 3, 7, 'beauty' ),
( 4, 7, 'health' ),
( 5, 7, 'others' );

-- bid, on hold, closed for incoming transaction, refund and released for outgoing transaction
INSERT INTO
    trans_status (`name`)
VALUES
( 'bidding' ),
( 'on hold' ),
( 'closed' ),
( 'refund' ),
( 'released' );

INSERT INTO
    post (seller, title, price, item_condition_id, category_id, sub_category_id)
VALUES
( 1, 'shelf', 45, 1, 2, 4),
( 1, 'drawing brush', 15, 2, 6, 2);

INSERT INTO
    image_list (post_id, images_link)
VALUES
( 1, 'https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' ),
( 1, 'https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' ),
( 1, 'https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' ),
( 2, 'https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' ),
( 2, 'https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' ),
( 2, 'https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' );

INSERT INTO
    user (username, firstname, lastname, email, `password`, house_num, street, city, province_code, postcode, country_code)
VALUES 
( 'user3','Kelly', 'Davis', 'kelly@test.com', 'test', '4300', 'Kingsway', 'Burnaby','BC','V5H 1Z8', 'CA' ),
( 'user4', 'Kevin', 'Brown', 'kevin@test.com', 'test', '4300', 'Still Creek Dr', 'Vancouver','BC','V5C 6C6', 'CA' );

INSERT INTO 
    rating (stars, rater, ratee, title)
VALUES
(4,1,2,'great service'),
(2,3,2,'terrible'),
(4,4,2,'Ok'),
(3,2,1,'so so'),
(3,3,1,'acceptable'),
(2,4,1,'terrible'),
(5,1,3,'love it'),
(5,2,3,'recommend'),
(5,4,3,'great'),
(3,1,4,'not impressed'),
(4,2,4,'Ok');