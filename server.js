import dotenv from "dotenv";
// Load environment variables from .env file before another
await dotenv.config();

import fs from "fs";
import yaml from "js-yaml";
import express from "express";
import errorHandler from "./utils/errorHandler.js";
import requestLogger from "./middleware/requestLogger.js";
import logger from "./utils/logger.js";
import { initializeRedisClient } from "./redisClient.js";
import { initializeMysqlPool } from "./mysqlPool.js";
import AuthRoutes from "./routes/authRoutes.js";



let app = express();

// server init success resolve
let serverPromiseResolve = null;
// server init success promise
// await serverPromise; // => your express next
const serverPromise = new Promise((resolve, rejection) => {
    serverPromiseResolve = resolve;
});

async function initializeExpressServer() {
    console.log(`[app] NODE_ENV:${process.env.NODE_ENV}`);

    // Load configuration from YAML file
    const config = yaml.load(fs.readFileSync("./config/serverConfig.yaml", "utf8"));

    // USE NODE_ENV or fallback to YAML env
    const env = process.env.NODE_ENV || config.server.env;

    // Get the config based on environment
    const serverConfig = config.server[env] || config.server;

    // Apply the configuration
    const port = process.env.PORT || serverConfig.port;
    const logLevel = serverConfig.logLevel || "info";
    const baseUrl = process.env.API_BASEURL;

    // Set logging level based on configuration
    console.log(`Server is running in ${env} mode.`);
    console.log(`Using ${logLevel} level logging.`);
    console.log(`Server Api baseUrl ${baseUrl}`);

    // Middleware: Express JSON parsing
    app.use(express.json());

    // To avoid duplicate port listening during Jest execution.
    if (process.env.NODE_ENV !== "test") {
        // Start the server
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    }
}

async function effect() {
    await initializeRedisClient();

    await initializeMysqlPool();

    await initializeExpressServer();

    // Add the error handler middleware after all routes
    app.use(errorHandler);

    // Add the request handler middleware before all routes
    app.use(requestLogger);

    // Define route
    // await initAuthRoutes();
    app.use(AuthRoutes);

    serverPromiseResolve();

    logger.info("[server.js][init success]");
}

effect().catch((error) => {
    console.error(`[initializeExpressServer][error]`, error);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception: ", err);

    // Optionally, log the error or send alerts
    // Do not call process.exit() to prevent the process from exiting
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    logger.error("Unhandled Rejection: ", err);
    // Optionally, log the rejection or send alerts
    // Do not call process.exit() to prevent the process from exiting
});

export { serverPromise };

export default app;
