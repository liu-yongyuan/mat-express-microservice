import log4js from "log4js";

// Configure log4js
log4js.configure({
    appenders: {
        file: {
            type: "file",
            filename: "logs/app", // Base filename
            maxLogSize: 100 * 1024 * 1024, // Max file size: 100MB
            backups: 3, // Keep 3 backup logs
            compress: true, // Compress rotated files
            pattern: "yyyy-MM-dd.log", // Date-based pattern
            alwaysIncludePattern: true, // Ensure the date pattern is always included
        },
        console: { type: "stdout" },
    },
    categories: {
        default: { appenders: ["file", "console"], level: process.env.LOG_LEVEL },
    },
});

// Get a logger instance
const logger = log4js.getLogger();

export default logger;
