CREATE TABLE delivery_method
(
  method_id     uuid NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  method_name   VARCHAR(100) NOT NULL,
  delivery_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO delivery_method (method_name)
VALUES ('Dine In'),
       ('Pick Up'),
       ('Door Delivery');