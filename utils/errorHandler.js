const errorHandler = (err, req, res, next) => {
    // Set the status code based on the error type (or use a default of 500)
    const statusCode = err.status || 500;

    // Log the error (you could integrate a logging service here)
    console.error(err.stack);

    // Return error response
    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong!",
        error: process.env.NODE_ENV === "production" ? {} : err.stack, // Hide error details in production
    });
};

export default errorHandler;
