
-- database create
CREATE DATABASE online_store
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- databse set
ALTER DATABASE online_store
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- online store tables
use online_store;
CREATE TABLE customers (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


use online_store;
CREATE TABLE categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  parent_category_id INT DEFAULT NULL,
  FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
);


use online_store;
  CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    category_id INT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
  );

use online_store;
CREATE TABLE orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT,
  status ENUM('pending', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  payment_status ENUM('unpaid', 'paid', 'refunded') DEFAULT 'unpaid',
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);


use online_store;
CREATE TABLE order_items (
  order_item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

use online_store;
CREATE TABLE payments (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('credit_card', 'paypal', 'bank_transfer') NOT NULL,
  payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

use online_store;
CREATE TABLE product_reviews (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  customer_id INT,
  rating INT CHECK(rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

--  full set of sample data for all the tables in your schema
-- Insert sample customers data
use online_store;
INSERT INTO customers (first_name, last_name, email, password, phone, address, city, postal_code, country)
VALUES
  ('John', 'Doe', 'john.doe@example.com', 'password123', '123-456-7890', '123 Main St', 'New York', '10001', 'USA'),
  ('Jane', 'Smith', 'jane.smith@example.com', 'password456', '234-567-8901', '456 Elm St', 'Los Angeles', '90001', 'USA'),
  ('Alice', 'Johnson', 'alice.johnson@example.com', 'password789', '345-678-9012', '789 Oak St', 'Chicago', '60001', 'USA'),
  ('Bob', 'Williams', 'bob.williams@example.com', 'password101', '456-789-0123', '101 Pine St', 'Houston', '77001', 'USA'),
  ('Charlie', 'Brown', 'charlie.brown@example.com', 'password202', '567-890-1234', '202 Maple St', 'San Francisco', '94101', 'USA');

-- Insert sample categories data
INSERT INTO categories (name, description, parent_category_id)
VALUES
  ('Electronics', 'All kinds of electronics and gadgets', NULL),
  ('Phones', 'Smartphones and accessories', 1),
  ('Laptops', 'Laptops, desktops, and accessories', 1),
  ('Clothing', 'Fashion and clothing items', NULL),
  ('Men\'s Clothing', 'Clothing for men', 4);


-- Insert sample products data
use online_store;
INSERT INTO products (name, description, price, stock_quantity, category_id, image_url)
VALUES
  ('Smartphone XYZ', 'A high-end smartphone with a large screen', 699.99, 50, 2, 'https://example.com/img/smartphone.jpg'),
  ('Laptop ABC', 'A powerful laptop for work and gaming', 999.99, 30, 3, 'https://example.com/img/laptop.jpg'),
  ('T-shirt Red', 'Comfortable cotton t-shirt in red', 19.99, 100, 5, 'https://example.com/img/tshirt.jpg'),
  ('Smartwatch DEF', 'A smartwatch with fitness tracking features', 199.99, 75, 2, 'https://example.com/img/smartwatch.jpg'),
  ('Jeans Blue', 'Blue jeans for casual wear', 49.99, 120, 5, 'https://example.com/img/jeans.jpg');


-- Insert sample orders data
INSERT INTO orders (customer_id, total_amount, shipping_address, status, payment_status)
VALUES
  (1, 719.99, '123 Main St, New York, NY 10001', 'pending', 'unpaid'),
  (2, 1199.99, '456 Elm St, Los Angeles, CA 90001', 'shipped', 'paid'),
  (3, 69.98, '789 Oak St, Chicago, IL 60001', 'delivered', 'paid'),
  (4, 249.98, '101 Pine St, Houston, TX 77001', 'cancelled', 'refunded'),
  (5, 69.98, '202 Maple St, San Francisco, CA 94101', 'pending', 'unpaid');

-- Insert sample order items data
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES
  (1, 1, 1, 699.99),
  (1, 4, 1, 199.99),
  (2, 2, 1, 999.99),
  (3, 3, 2, 19.99),
  (4, 5, 2, 49.99),
  (5, 3, 2, 19.99);


-- Insert sample payments data
INSERT INTO payments (order_id, amount, payment_method, payment_status)
VALUES
  (1, 719.99, 'credit_card', 'pending'),
  (2, 1199.99, 'paypal', 'completed'),
  (3, 69.98, 'paypal', 'completed'),
  (4, 249.98, 'bank_transfer', 'refunded'),
  (5, 69.98, 'credit_card', 'pending');


-- Insert sample product reviews data
INSERT INTO product_reviews (product_id, customer_id, rating, review_text)
VALUES
  (1, 1, 5, 'Great smartphone! Love the performance and battery life.'),
  (2, 2, 4, 'Nice laptop but a bit heavy. Good for gaming though.'),
  (3, 3, 5, 'Love this t-shirt! Comfortable and fits perfectly.'),
  (4, 1, 4, 'Good smartwatch, but could use a few more features.'),
  (5, 4, 3, 'Jeans are fine, but the fit could be better.'),
  (1, 5, 4, 'Smartphone is good for the price.'),
  (3, 2, 2, 'The t-shirt shrank after the first wash.');
