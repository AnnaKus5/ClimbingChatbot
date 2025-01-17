CREATE DATABASE IF NOT EXISTS climbing_data;
USE climbing_data;

CREATE TABLE crags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL
);

CREATE TABLE sectors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    crag_id INT NOT NULL,
    FOREIGN KEY (crag_id) REFERENCES crags(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE routes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    sector_id INT NOT NULL,
    tall_recommend_sum FLOAT,
    grade_mean FLOAT,
    cluster INT,
    rating_tot FLOAT,
    FOREIGN KEY (sector_id) REFERENCES sectors(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

LOAD DATA INFILE '/var/lib/mysql-files/crags.csv'
INTO TABLE crags
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/var/lib/mysql-files/sectors.csv'
INTO TABLE sectors
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA INFILE '/var/lib/mysql-files/routes.csv'
INTO TABLE routes
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;