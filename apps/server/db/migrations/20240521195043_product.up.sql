CREATE TABLE product
(
  id           uuid NULL     DEFAULT gen_random_uuid() PRIMARY KEY,
  name         VARCHAR,
  description  VARCHAR,
  image_url    VARCHAR,
  category     VARCHAR,
  is_available BOOLEAN,
  promo        NUMERIC(3, 2) NOT NULL DEFAULT 0,
  created_at   TIMESTAMP              DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP              DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO product (name, description, image_url, category, is_available)
VALUES ('Product A', 'Description for Product A', 'http://example.com/imageA.jpg', 'Category 1', TRUE),
       ('Product B', 'Description for Product B', 'http://example.com/imageB.jpg', 'Category 2', TRUE),
       ('Product C', 'Description for Product C', 'http://example.com/imageC.jpg', 'Category 1', FALSE);
