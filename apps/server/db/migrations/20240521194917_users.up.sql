CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users
(
  id           uuid NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  username     VARCHAR,
  password     VARCHAR,
  email        VARCHAR,
  phone_number VARCHAR,
  role         VARCHAR,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (username, password, email, phone_number, role)
VALUES ('john_doe', 'password123', 'john@example.com', '1234567890', 'customer'),
       ('jane_smith', 'password123', 'jane@example.com', '0987654321', 'customer'),
       ('admin', 'adminpassword', 'admin@example.com', '1122334455', 'admin');