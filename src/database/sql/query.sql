SELECT 
    AVG(r.stars) AS average_rating,
    COUNT(r.id) AS total_rating,
    u.id AS user_id
FROM
    user AS u
    INNER JOIN rating AS r ON u.id = r.ratee
    GROUP BY r.ratee;


-- highest bid for each post
SELECT 
    b2.bid,
    b2.bidder,
    b2.post_id,
    b2.created_at,
    u.username
FROM
    (SELECT post_id, MAX(bid) as bid
        FROM
        biding 
        GROUP BY post_id) b1
    INNER JOIN biding AS b2 ON b1.post_id = b2.post_id AND b1.bid = b2.bid
    INNER JOIN user AS u ON u.id = b2.bidder;
    