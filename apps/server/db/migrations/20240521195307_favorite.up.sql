CREATE TABLE favorite
(
  favorite_id uuid NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id  uuid REFERENCES product (id),
  user_id     uuid REFERENCES users (id),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO favorite (product_id, user_id)
VALUES ((SELECT id FROM product WHERE name = 'Product A'), (SELECT id FROM users WHERE username = 'john_doe')),
       ((SELECT id FROM product WHERE name = 'Product B'), (SELECT id FROM users WHERE username = 'jane_smith'));
