ALTER TABLE customer
ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;

update customer set is_admin = TRUE where email = 'matt.liu@onlinestore.com';

CREATE TABLE
    product_ownership (
        ownership_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique ID for each product ownership entry',
        product_id INT NOT NULL COMMENT 'ID of the product owned by the customer',
        customer_id INT NOT NULL COMMENT 'ID of the customer who owns the product',
        UNIQUE (product_id, customer_id) COMMENT 'Ensures one product can only have one customer as owner at a time'
    ) COMMENT = 'Stores the ownership information, mapping customers to products, ensuring a one-to-one relationship between product and customer ownership' ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;



INSERT INTO product (name, description, price, stock_quantity, category_id, image_url)
VALUES
  ('Smartphone XYZ', 'A high-end smartphone with a large screen', 699.99, 50, 2, 'https://example.com/img/smartphone.jpg'),
  ('Laptop ABC', 'A powerful laptop for work and gaming', 999.99, 30, 3, 'https://example.com/img/laptop.jpg'),
  ('T-shirt Red', 'Comfortable cotton t-shirt in red', 19.99, 100, 5, 'https://example.com/img/tshirt.jpg'),
  ('Smartwatch DEF', 'A smartwatch with fitness tracking features', 199.99, 75, 2, 'https://example.com/img/smartwatch.jpg'),
  ('Jeans Blue', 'Blue jeans for casual wear', 49.99, 120, 5, 'https://example.com/img/jeans.jpg');


-- Insert sample orders data
INSERT INTO order (customer_id, total_amount, shipping_address, status, payment_status)
VALUES
  (1, 719.99, '123 Main St, New York, NY 10001', 'pending', 'unpaid'),
  (2, 1199.99, '456 Elm St, Los Angeles, CA 90001', 'shipped', 'paid'),
  (3, 69.98, '789 Oak St, Chicago, IL 60001', 'delivered', 'paid'),
  (4, 249.98, '101 Pine St, Houston, TX 77001', 'cancelled', 'refunded'),
  (5, 69.98, '202 Maple St, San Francisco, CA 94101', 'pending', 'unpaid');

-- Insert sample order items data
INSERT INTO order_item (order_id, product_id, quantity, price)
VALUES
  (1, 1, 1, 699.99),
  (1, 4, 1, 199.99),
  (2, 2, 1, 999.99),
  (3, 3, 2, 19.99),
  (4, 5, 2, 49.99),
  (5, 3, 2, 19.99);


-- Insert sample payments data
INSERT INTO payment (order_id, amount, payment_method, payment_status)
VALUES
  (1, 719.99, 'credit_card', 'pending'),
  (2, 1199.99, 'paypal', 'completed'),
  (3, 69.98, 'paypal', 'completed'),
  (4, 249.98, 'bank_transfer', 'refunded'),
  (5, 69.98, 'credit_card', 'pending');


-- Insert sample product reviews data
INSERT INTO product_review (product_id, customer_id, rating, review_text)
VALUES
  (1, 1, 5, 'Great smartphone! Love the performance and battery life.'),
  (2, 2, 4, 'Nice laptop but a bit heavy. Good for gaming though.'),
  (3, 3, 5, 'Love this t-shirt! Comfortable and fits perfectly.'),
  (4, 1, 4, 'Good smartwatch, but could use a few more features.'),
  (5, 4, 3, 'Jeans are fine, but the fit could be better.'),
  (1, 5, 4, 'Smartphone is good for the price.'),
  (3, 2, 2, 'The t-shirt shrank after the first wash.');

