CREATE TABLE goods(
            id INT NOT NULL AUTO_INCREMENT,
            article VARCHAR(30),
            img VARCHAR(1000),
            price DECIMAL(6,2),
            PRIMARY KEY(id)
    );
    
    INSERT INTO goods(article, img, price) VALUES
    ("Hemsworth Suit", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1zBZwcj1Q5XnrUfcZPFW1wDwZtSxK18RGcY-uuMrT7GYdcarym2wxR39e", 669),
    ("MEN long Sleev Shirt", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8o8CIuKHqCpK2MjeJxZTDCCBfufsVZPQOePwkmMmKVUJlDsOP", 78),
    ("Khaki Pants", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7_o8aiL_xitjhO072-RUDmmcdbXYqKpq9sheDsVDtAOKkg9Kb", 45.99),
    ("Golden T-shirt", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMR7CSmJWvCazxu2ULB8GbwCsXHUfV9fDp06xJ73XHQgJ5VKxkYA", 9.25),
    ("jackson T-shirt", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9VHFc2FV4NiMaRsVZIN6Q7SMzbiJsJ0-g3pgZVzLeNVxW3_j52w", 8.75);

    CREATE TABLE groups(    
            id INT NOT NULL AUTO_INCREMENT,
            group_name VARCHAR (50) NOT NULL,
            PRIMARY KEY(id)
    );
    INSERT INTO groups(group_name) VALUES
    ("Men Clothe"),
    ("Shoes"),
    ("Shirt"),
    ("Suit"),
    ("T-shirt"),
    ("Pants");
    
        CREATE TABLE goods_group(    
            goods_id INT NOT NULL,
            group_id INT NOT NULL,
            FOREIGN KEY(goods_id) REFERENCES goods(id),
            FOREIGN KEY(group_id) REFERENCES groups(id)
    );
    INSERT INTO goods_group(goods_id, group_id) VALUES
    (1, 1),
    (1, 4),
    (2, 1),
    (2, 3),
    (3, 1),
    (3, 6),
    (4, 1),
    (4, 5),
    (5, 1),
    (5, 5);
    
    -- find name of goods and its group model
    SELECT article, group_name FROM goods_group
    INNER JOIN goods ON goods.id = goods_group.goods_id
    INNER JOIN groups ON groups.id = goods_group.group_id;
    
    -- find imge from special group 
    SELECT img FROM goods_group
    INNER JOIN goods ON goods.id = goods_group.goods_id
    INNER JOIN groups ON groups.id = goods_group.group_id
    WHERE group_name = "shirts";
    
    -- or
    SELECT img FROM goods_group
    INNER JOIN goods ON goods.id = goods_group.goods_id
    WHERE group_id = 3;