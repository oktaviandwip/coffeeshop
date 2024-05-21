CREATE TABLE cart_order
(
  order_id         uuid           NULL     DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          uuid REFERENCES users (id),
  delivery_method_id          uuid REFERENCES delivery_method (method_id),
  payment_method_id          uuid REFERENCES payment_method (method_id),
  total_price      INTEGER, -- SubTotal
  taxes            DECIMAL(10, 2) NOT NULL DEFAULT 0,
  shipping         INTEGER,
  status           VARCHAR,
  delivery_address VARCHAR, -- Default ngambil alamat dari profile alamat
  total_amount     INTEGER, -- Total
  created_at       TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP               DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO cart_order (user_id, delivery_method_id, payment_method_id, total_price, taxes, shipping, status, delivery_address, total_amount) VALUES
                                                                                                                                                ((SELECT id FROM users WHERE username = 'john_doe'), (SELECT method_id FROM delivery_method WHERE method_name = 'Standard Shipping'), (SELECT method_id FROM payment_method WHERE method_name = 'Credit Card'), 300, 30.00, 50, 'Pending', '123 Main St', 380),
                                                                                                                                                ((SELECT id FROM users WHERE username = 'jane_smith'), (SELECT method_id FROM delivery_method WHERE method_name = 'Express Shipping'), (SELECT method_id FROM payment_method WHERE method_name = 'PayPal'), 200, 20.00, 30, 'Shipped', '456 Maple St', 250);