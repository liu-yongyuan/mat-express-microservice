import { createLogger, format, transports } from "winston";
import dotenv from "dotenv";
dotenv.config();

// Define log format
const logFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message, ...metadata }) => {
        let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;
        if (metadata) {
            // Check if there's any splat metadata
            if (metadata[Symbol.for("splat")]) {
                // Combine the splat metadata arguments into the log message
                log += " - " + metadata[Symbol.for("splat")].map((arg) => JSON.stringify(arg)).join(" ");
            }

            // If there are other metadata, add them to the log message
            for (const key in metadata) {
                if (key !== Symbol.for("splat")) {
                    log += ` - ${key}: ${JSON.stringify(metadata[key])}`;
                }
            }
        }
        return log;
    }),
);

// Initialize the logger
const logger = createLogger({
    level: process.env.LOG_LEVEL || "info", // Set log level (default: 'info')
    format: logFormat,
    transports: [
        new transports.Console(),
        new transports.File({ filename: "logs/combined.log" }), // All logs go to a combined file
    ],
    exceptionHandlers: [
        new transports.File({ filename: "logs/error.log", level: "error" }), // Error logs go to file
    ],
});

export default logger;
