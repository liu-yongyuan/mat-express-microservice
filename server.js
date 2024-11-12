import { app } from "./app.js";
import logger from "./utils/logger.js";
import requestLogger from "./middleware/requestLogger.js";
import productsRoute from "./routes/productsRoutes.js";
import authRoutes from "./routes/authRoutes.js";

app.use(requestLogger);

// define routes
app.use(authRoutes);
app.use(productsRoute);

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

export default app;
