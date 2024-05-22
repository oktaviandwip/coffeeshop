CREATE TABLE cart_item
(
  id           uuid NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cart_id      uuid REFERENCES cart (id),
  product_id   uuid REFERENCES product (id),
  size_id      uuid REFERENCES size (id),
  quantity     INTEGER NOT NULL,
  ordered BOOLEAN,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO cart_item (cart_id, product_id, size_id, quantity, ordered) VALUES
                                                                          ((SELECT id FROM cart WHERE user_id = (SELECT id FROM users WHERE username = 'john_doe')), (SELECT id FROM product WHERE name = 'Product A'), (SELECT id FROM size WHERE size_name = 'Small'), 2, FALSE),
                                                                          ((SELECT id FROM cart WHERE user_id = (SELECT id FROM users WHERE username = 'jane_smith')), (SELECT id FROM product WHERE name = 'Product B'), (SELECT id FROM size WHERE size_name = 'Large'), 1, FALSE);
