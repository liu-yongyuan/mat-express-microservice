# Online Store

An online store application built with Node.js, Express, MySQL, and Docker. This project demonstrates a basic e-commerce backend with authentication, role-based access control, and data persistence using MySQL.

## Features

- **User Authentication**: Secure user login and registration using JWT tokens.
- **Role-Based Access Control**: Admins have full control over product management, while regular users can only modify their own data.
- **Product Management**: CRUD operations for managing products in the store.
- **Validation**: Input validation using `Joi`.
- **Logging**: Request and error logging with `Winston`.
- **Dockerized**: Containerized setup for easy deployment with Docker and Docker Compose.

## Project Structure


### Important Files

- **`config/db.js`**: Database connection configuration.
- **`controllers/`**: Contains logic for handling user, authentication, and product routes.
- **`middlewares/`**: Auth and role-based access control middlewares.
- **`models/`**: Database models for interacting with MySQL tables.
- **`routes/`**: Defines routes for products, users, and authentication.
- **`docker/`**: Docker setup files for containerized deployment.
- **`tests/`**: Test files for endpoints using Jest and Supertest.

## Setup

### Prerequisites

- Node.js (v18+)
- Docker & Docker Compose
- MySQL database (if not using Docker)

### Installation


1. Clone the repository:
   ```
   git clone https://github.com/liu-yongyuan/mat-learn-examples.git
   cd mat-learn-examples/online-store
   ```


2. Install dependencies:
    ```
    npm install
    ```

3. Running Tests
    ```bash
    npm test
    ```