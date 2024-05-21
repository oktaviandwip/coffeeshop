CREATE TABLE profile
(
  id           uuid NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name   VARCHAR,
  last_name    VARCHAR,
  display_name VARCHAR,
  gender       VARCHAR,
  address      VARCHAR,
  user_id      uuid UNIQUE REFERENCES users (id),
  birthday     DATE,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO profile (first_name, last_name, display_name, gender, address, user_id, birthday)
VALUES ('John', 'Doe', 'johndoe', 'male', '123 Main St', (SELECT id FROM users WHERE username = 'john_doe'),
        '1990-01-01'),
       ('Jane', 'Smith', 'janesmith', 'female', '456 Maple St', (SELECT id FROM users WHERE username = 'jane_smith'),
        '1992-02-02');
