CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users
(
  user_id uuid DEFAULT gen_random_uuid(),
  email VARCHAR NOT NULL unique,
  phone VARCHAR NOT NULL unique,
  password VARCHAR NOT NULL,
  role VARCHAR NOT NULL,
	created_at TIMESTAMP without time zone not null DEFAULT NOW(),
	updated_at TIMESTAMP without time zone null,
	CONSTRAINT users_pk PRIMARY KEY (user_id)
);

CREATE TABLE profile
(
  profile_id   uuid DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL,
  first_name   VARCHAR,
  last_name    VARCHAR,
  display_name VARCHAR,
  gender       VARCHAR,
  address      VARCHAR,
  birthday     DATE,
  created_at TIMESTAMP without time zone not null DEFAULT NOW(),
	updated_at TIMESTAMP without time zone null,
  CONSTRAINT profile_pk primary key (profile_id),
	CONSTRAINT fk_profile_users FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE product
(
    id          uuid NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name        VARCHAR,
    description VARCHAR,
    image_url   VARCHAR,
    category    VARCHAR,
    is_available BOOLEAN,
    promo       NUMERIC(3,2) NOT NULL DEFAULT 0,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE size
(
    id        uuid NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    size_name VARCHAR
);

CREATE TABLE product_size
(
    product_id uuid REFERENCES product (id),
    size_id    uuid REFERENCES size (id),
    price       INTEGER,
    PRIMARY KEY (product_id, size_id)
);

CREATE TABLE favorite
(
    favorite_id         uuid NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id uuid REFERENCES product (id),
    user_id    uuid REFERENCES users (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_order
(
    order_id    uuid NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id    uuid REFERENCES users (id),
    total_price    INTEGER, -- SubTotal
    taxes          DECIMAL(10, 2) NOT NULL DEFAULT 0,
    shipping INTEGER,
    status    VARCHAR,
    delivery_address    VARCHAR, -- Default ngambil alamat dari profile alamat
    total_amount    INTEGER, -- Total
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
);
-- SubTotal
CREATE TABLE cart_order_items (
    order_item_id uuid NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id uuid REFERENCES order (order_id),
    product_id uuid REFERENCES product (id),
    size_id uuid REFERENCES size (id),
    quantity INTEGER NOT NULL,
    amount INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE delivery_method (
    method_id INT PRIMARY KEY AUTO_INCREMENT,
    method_name VARCHAR(100) NOT NULL,
    delivery_time  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE payment_method (
    method_id INT PRIMARY KEY AUTO_INCREMENT,
    method_name VARCHAR(100) NOT NULL,
);