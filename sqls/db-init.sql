-- database create
CREATE DATABASE online_store CHARACTER
SET
  utf8mb4 COLLATE utf8mb4_unicode_ci;

-- databse set
ALTER DATABASE online_store CHARACTER
SET
  utf8mb4 COLLATE utf8mb4_unicode_ci;

-- online store tables
use online_store;

CREATE TABLE
  customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for each customer',
    first_name VARCHAR(100) NOT NULL COMMENT 'Customer\'s first name',
    last_name VARCHAR(100) NOT NULL COMMENT 'Customer\'s last name',
    email VARCHAR(255) NOT NULL UNIQUE COMMENT 'Customer\'s email address (unique)',
    password VARCHAR(255) NOT NULL COMMENT 'Customer\'s password (hashed)',
    phone VARCHAR(20) COMMENT 'Customer\'s phone number',
    address TEXT COMMENT 'Customer\'s full address',
    city VARCHAR(100) COMMENT 'City where the customer resides',
    postal_code VARCHAR(20) COMMENT 'Postal code of the customer\'s address',
    country VARCHAR(100) COMMENT 'Country where the customer resides',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the customer was created'
  ) COMMENT = 'Table that stores information about customers' ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Categories table to store product categories
CREATE TABLE
  categorie (
    category_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique ID for each category',
    name VARCHAR(100) NOT NULL COMMENT 'Name of the category',
    description TEXT COMMENT 'Description of the category',
    parent_category_id INT DEFAULT NULL COMMENT 'ID of the parent category, null if top-level category'
  ) COMMENT = 'Stores product categories' ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Products table to store product details
CREATE TABLE
  product (
    product_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique ID for each product',
    name VARCHAR(255) NOT NULL COMMENT 'Product name',
    description TEXT COMMENT 'Product description',
    price DECIMAL(10, 2) NOT NULL COMMENT 'Product price',
    stock_quantity INT DEFAULT 0 COMMENT 'Stock quantity available for the product',
    category_id INT COMMENT 'Category ID, links to categorie table, but no foreign key',
    image_url VARCHAR(255) COMMENT 'URL to product image',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the product was created'
  ) COMMENT = 'Stores product details' ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Orders table to store customer orders
CREATE TABLE
  `order` (
    order_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique ID for each order',
    customer_id INT COMMENT 'Customer ID, but no foreign key to customers table',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the order was created',
    total_amount DECIMAL(10, 2) NOT NULL COMMENT 'Total amount of the order',
    shipping_address TEXT COMMENT 'Shipping address for the order',
    status INT DEFAULT 1 COMMENT 'Order status (1: pending, 2: shipped, 3: delivered, 4: cancelled)',
    payment_status INT DEFAULT 1 COMMENT 'Payment status (1: unpaid, 2: paid, 3: refunded)'
  ) COMMENT = 'Stores customer orders' ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Order items table to store details of each product in an order
CREATE TABLE
  order_item (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique ID for each order item',
    order_id INT COMMENT 'Order ID, but no foreign key to orders table',
    product_id INT COMMENT 'Product ID, but no foreign key to products table',
    quantity INT NOT NULL COMMENT 'Quantity of the product in the order',
    price DECIMAL(10, 2) NOT NULL COMMENT 'Price of the product at the time of order'
  ) COMMENT = 'Stores product details for each order' ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Payments table to store payment information for orders
CREATE TABLE
  payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique ID for each payment',
    order_id INT COMMENT 'Order ID, but no foreign key to orders table',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the payment was made',
    amount DECIMAL(10, 2) NOT NULL COMMENT 'Amount of the payment',
    payment_method INT NOT NULL COMMENT 'Payment method (1: credit card, 2: paypal, 3: bank transfer)',
    payment_status INT DEFAULT 1 COMMENT 'Payment status (1: pending, 2: completed, 3: failed, 4: refunded)'
  ) COMMENT = 'Stores payment details for each order' ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Product reviews table to store customer reviews for products
CREATE TABLE
  product_review (
    review_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique ID for each product review',
    product_id INT COMMENT 'Product ID, but no foreign key to products table',
    customer_id INT COMMENT 'Customer ID, but no foreign key to customers table',
    rating INT COMMENT 'Rating given by the customer (1-5)',
    review_text TEXT COMMENT 'Review text provided by the customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the review was created'
  ) COMMENT = 'Stores customer reviews for products' ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;