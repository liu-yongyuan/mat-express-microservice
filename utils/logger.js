import log4js from "log4js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
// Configure log4js
log4js.configure({
    appenders: {
        file: { type: "file", filename: "logs/app.log" },
        console: { type: "stdout" },
    },
    categories: {
        default: { appenders: ["file", "console"], level: process.env.LOG_LEVEL },
    },
});

// Get a logger instance
const logger = log4js.getLogger();

export default logger;
