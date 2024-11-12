ALTER TABLE customers
ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;

CREATE TABLE product_ownership (
    ownership_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    customer_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    UNIQUE (product_id, customer_id)  -- Ensures one product has only one owner
);

INSERT INTO customers (first_name, last_name, email, password, phone, address, city, postal_code, country, is_admin)
VALUES 
    ('admin', 'SuperRole', 'admin@onlinestore.com', 'Abc.123.Zxc', '123-456-7890', '123 Main St', 'New York', '10001', 'USA', true);
  