
INSERT INTO
    province (code, `name`)
VALUES
(
    'AB', 'Alberta'
),
(
    'BC', 'British Columbia'
),
(
    'MB', 'Manitoba'
),
(
    'NB', 'New Brunswick'
),
(
    'NL', 'Newfoundland and Labrador'
),
(
    'NS', 'Nova Scotia'
),
(
    'ON', 'Ontario'
),
(
    'PE', 'Prince Edward Island'
);

INSERT INTO
    country (code, `name`)
VALUES
(
    'CA', 'Cananda'
),
(
    'US', 'the United States of America'
);

INSERT INTO
    user (username, firstname, lastname, email, `password`, house_num, street, city, province_code, postcode, country_code)
VALUES 
(
    'FlyingDuck','Jim', 'Davis', 'jim@test.com', 'test', '473', '4567 Canada Way', 'Burnaby','BC','V5G 4T1', 'CA'
),
(
    'Wowooo', 'Sam', 'Brown', 'sam@test.com', 'test', '453', 'West 12th Avenue', 'Vancouver','BC','V5Y 1V4', 'CA'
);

INSERT INTO
    item_condition (name)
VALUES
(
    'new'
),
(
    'used'
),
(
    'refurbished'
),
(
    'open box'
);

INSERT INTO
    image_list (images_link)
VALUES
(
    'https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
),
(
    'https://images.pexels.com/photos/3777939/pexels-photo-3777939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
),
(
    "https://cdn.pixabay.com/photo/2016/02/15/22/47/kerosene-lamp-1202277_1280.jpg"
),
(
    "https://cdn.pixabay.com/photo/2015/09/02/12/28/light-918450_1280.jpg"
),
(
    "https://cdn.pixabay.com/photo/2018/01/24/17/33/light-bulb-3104355_1280.jpg"
);

INSERT INTO
    post (seller, title, price, item_condition_id, image_list_id)
VALUES
(
    1, 'shelf', 45, 1, 1
),
(
    1, 'drawing tools', 15, 2, 2
);

INSERT INTO post (seller, title, price, item_condition_id, image_list_id)
VALUES (1, "light 1", 50, 1, 3),
(1, "light 2", 100, 1, 4),
(1, "light 3", 500, 1, 5);