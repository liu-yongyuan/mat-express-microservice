# MAT Express Microservice

MAT Express Microservice is a scalable Node.js backend service built using Express, MySQL, Redis, and Docker. This project is designed to demonstrate how to build a simple but efficient microservice-based architecture for handling various backend operations, such as user authentication, product management, and order processing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

To get started with this project, clone the repository and install the required dependencies:

```bash
git clone https://github.com/liu-yongyuan/mat-express-microservice.git
cd mat-express-microservice
npm install
```

## Usage

before execute sqls/*.sql

To start the development environment with Node.js and Redis, run the following command:

```bash
npm start
```

This will start the necessary services (MySQL, Redis, and Express) for the project.

## Running Tests

For testing, use Jest and Supertest. To run the tests, use:

```bash
npm run test
```

This will run all unit tests and integration tests in the tests/ directory. 

## Project Structure
Here is the structure of the project:

```text
/mat-express-microservice
│
├── /config              # Configuration files (e.g., MySQL, Redis)
├── /controllers         # Express route controllers
├── /models              # Database models and ORM logic
├── /routes              # API routes
├── /services            # Service layer (business logic)
├── /middlewares         # Express middleware (e.g., authentication)
├── /tests               # Unit and integration tests
├── /docker              # Docker files and configuration
├── .env                 # Environment variables
├── .gitignore           # Git ignore configuration
├── package.json         # NPM dependencies and scripts
└── README.md            # Project documentation
```

Key Folders and Files

```text
/config: Contains all the configuration settings, such as database and Redis connection info.
/controllers: Handles incoming HTTP requests and performs necessary actions using services or models.
/models: Contains database models and query logic for interacting with MySQL or Redis.
/routes: API route definitions.
/services: Handles business logic for different features such as authentication or product management.
/middlewares: Middleware for functions like authentication, logging, and error handling.
/tests: Contains Jest tests for unit and integration testing.
```
## Dependencies

This project uses the following major dependencies:

```text

Express: Web framework for building RESTful APIs
MySQL2: MySQL client for database operations
Redis: In-memory data store for caching
JWT: JSON Web Token for authentication
bcryptjs: For hashing and comparing passwords
dotenv: To load environment variables
winston: Logging utility for capturing application logs
Jest: Testing framework for unit and integration tests
Supertest: HTTP assertions for testing Express APIs
```

## Environment Variables

The project uses environment variables to manage sensitive information and configuration. You can create a .env file in the root directory with the following example:

```text
#Default development
NODE_ENV=development

#winston log level
LOG_LEVEL=info

#JWTSECRET 
JWT_SECRET=a2C.xYz

#API_PREFIX
API_BASEURL=/api/v1
```

## License
MIT License - see LICENSE file for details.


## Thank you for checking out this project

Thank you for checking out this project! Feel free to submit issues, pull requests, or contact me for any suggestions or questions.

```bash
### Steps to Save the File:

1. Open a text editor (such as VSCode, Sublime Text, or Notepad++).
2. Copy the above content.
3. Paste it into a new file.
4. Save the file as `README.md` in the root directory of your project.

Once saved, you can push it to your GitHub repository and share it with others.

Let me know if you need any further help!
```