import logger from "../utils/logger.js";

// Middleware to log incoming request
function requestLogger(req, res, next) {
    const start = Date.now();

    // Continue to the next middleware or route handle
    res.on("finish", () => {
        const duration = Date.now() - start;
        const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

        // Log based on the status code
        if (res.statusCode >= 500) {
            logger.error(logMessage);
        } else if (res.statusCode >= 400) {
            logger.warn(logMessage);
        } else {
            logger.info(logMessage);
        }

    });

    next();
}

export default requestLogger;