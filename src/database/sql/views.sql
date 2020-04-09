CREATE OR REPLACE VIEW view_all_category AS
SELECT
   category.id AS category_id,
   category.name AS category_name,
   JSON_ARRAYAGG(JSON_OBJECT(
                'sub_category_id', sub_category.id,
                'sub_category_name', sub_category.name
            )) AS sub_categories
FROM
    sub_category
    INNER JOIN category ON category_id = category.id
    GROUP BY category.id;

CREATE OR REPLACE VIEW view_user_rating_summary AS
SELECT 
    CAST(AVG(r.stars) AS DECIMAL(4,2)) AS average_rating,
    COUNT(r.id) AS total_rating,
    u.id AS user_id,
    u.username 
FROM
    user AS u
    INNER JOIN rating AS r ON u.id = r.ratee
    GROUP BY u.id;

CREATE OR REPLACE VIEW view_user_detail AS
SELECT
    u.*, ur.average_rating, ur.total_rating
FROM user AS u
     LEFT JOIN view_user_rating_summary AS ur ON u.id = ur.user_id;

CREATE OR REPLACE VIEW view_post_image_list AS
SELECT 
    post_id, 
    JSON_ARRAYAGG(images_link) image_list 
FROM image_list 
GROUP BY post_id;

CREATE OR REPLACE VIEW view_post_detail AS
SELECT
   p.id AS post_id,
   p.title AS post_title,
   p.description AS post_description,
   p.price AS post_price,
   p.seller AS seller,
   ic.name AS item_condition,
   c.id AS category_id,
   c.name AS category_name,
   sc.id AS sub_category_id,
   sc.name AS sub_category_name,
   p.created_at,
   p.is_active,
   vu.id AS user_id,
   vu.username,
   vu.average_rating,
   vu.total_rating,
    vi.image_list
FROM
    post AS p
    INNER JOIN view_user_detail AS vu ON p.seller = vu.id
    INNER JOIN item_condition AS ic ON ic.id = p.item_condition_id
    INNER JOIN sub_category AS sc ON p.sub_category_id = sc.id AND p.category_id = sc.category_id
    INNER JOIN category AS c ON sc.category_id = c.id
    INNER JOIN view_post_image_list AS vi ON vi.post_id = p.id;

CREATE OR REPLACE VIEW view_highest_biding AS
SELECT 
    MAX(bid) AS max_bid, 
    b.bidder,
    u.username 
FROM
    biding AS b
    INNER JOIN user AS u ON u.id = b.bidder
    GROUP BY u.id;

CREATE OR REPLACE VIEW view_rating_list AS
SELECT
    r.stars AS stars,
    r.ratee AS ratee,
    r.rater AS rater,
    u.username AS username,
    r.title AS title,
    r.`description` AS `description`,
    r.created_at AS created_at
FROM rating AS r
    INNER JOIN user AS u ON u.id = r.rater;
