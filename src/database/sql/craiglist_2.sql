DROP DATABASE IF EXISTS craiglist2_project;

CREATE DATABASE craiglist2_project;

ALTER DATABASE craiglist2_project CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;

USE craiglist2_project;

DROP TABLE IF EXISTS `province`;
CREATE TABLE `province` (
  `code` CHAR(2) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS `country`;
CREATE TABLE `country` (
  `code` CHAR(2) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `house_num` VARCHAR(255) NOT NULL,
  `street` VARCHAR(255),
  `city` VARCHAR(255),
  `province_code` CHAR(2) NOT NULL,
  `postcode` VARCHAR(255) NOT NULL,
  `country_code` CHAR(2) NOT NULL ,
  `is_verified` BOOLEAN DEFAULT FALSE,
  `payment_account` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (province_code) REFERENCES province (code) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (country_code) REFERENCES country (code) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `item_condition`;
CREATE TABLE `item_condition` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS `image_list`;
CREATE TABLE `image_list` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `images_link` TEXT NOT NULL
);

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` INT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS `sub_category`;
CREATE TABLE `sub_category` (
  `id` INT,
  `category_id` INT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (id, category_id),
  FOREIGN KEY (category_id) REFERENCES category (id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `seller` INT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(13, 2) NOT NULL,
  `item_condition_id` INT,
  `category_id` INT NOT NULL,
  `sub_category_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT NOW(),
  `image_list_id` INT,
  `is_active` BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (seller) REFERENCES user (id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (category_id) REFERENCES sub_category (category_id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (sub_category_id) REFERENCES sub_category (id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,  
  FOREIGN KEY (item_condition_id) REFERENCES item_condition (id) 
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (image_list_id) REFERENCES image_list (id) 
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `stars` INT NOT NULL,
  `rater` INT NOT NULL,
  `ratee` INT NOT NULL,
  `title` VARCHAR(255),
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (ratee) REFERENCES user (id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (rater) REFERENCES user (id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `biding`;
CREATE TABLE `biding` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `bidder` INT NOT NULL,
  `post_id` INT NOT NULL,
  `bid` DECIMAL(13, 2) NOT NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (bidder) REFERENCES user (id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES post (id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE  
);

-- possible state: bid and reserve for incoming, refund and payment for outgoing
DROP TABLE IF EXISTS `trans_status`;
CREATE TABLE `trans_status` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255)
);

DROP TABLE IF EXISTS `incoming_transaction`;
CREATE TABLE `incoming_transaction` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `amount` DECIMAL(13, 2) NOT NULL,
  `sender` INT NOT NULL,
  `post_id` INT NOT NULL,
  `account_num` VARCHAR(255) NOT NULL,
  `trans_status_id` int,
  `created_at` TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (sender) REFERENCES user (id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES post (id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE  
);

DROP TABLE IF EXISTS `outgoing_transaction`;
CREATE TABLE `outgoing_transaction` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `amount` DECIMAL(13, 2) NOT NULL,
  `receiver` INT NOT NULL,
  `incoming_transaction_id` INT NOT NULL,
  `account_num` VARCHAR(255) NOT NULL,
  `trans_status_id` int,
  `created_at` TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (receiver) REFERENCES user (id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  FOREIGN KEY (incoming_transaction_id) REFERENCES incoming_transaction (id) 
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);


