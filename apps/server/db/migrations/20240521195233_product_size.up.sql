CREATE TABLE product_size
(
  product_id uuid REFERENCES product (id),
  size_id    uuid REFERENCES size (id),
  price      INTEGER,
  PRIMARY KEY (product_id, size_id)
);
INSERT INTO product_size (product_id, size_id, price)
VALUES ((SELECT id FROM product WHERE name = 'Product A'), (SELECT id FROM size WHERE size_name = 'Small'), 100),
       ((SELECT id FROM product WHERE name = 'Product A'), (SELECT id FROM size WHERE size_name = 'Medium'), 150),
       ((SELECT id FROM product WHERE name = 'Product B'), (SELECT id FROM size WHERE size_name = 'Large'), 200);
