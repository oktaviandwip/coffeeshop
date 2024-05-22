CREATE TABLE profile
(
  id           uuid NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name   VARCHAR,
  last_name    VARCHAR,
  display_name VARCHAR,
  gender       VARCHAR,
  address      VARCHAR,
  user_id      uuid UNIQUE REFERENCES users (user_id),
  birthday     DATE,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
