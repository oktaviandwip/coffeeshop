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
