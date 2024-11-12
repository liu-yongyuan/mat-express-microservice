import Joi from "joi";

// Example validation schemas
const schemas = {
    // Schema for validating product data
    products: Joi.object({
        name: Joi.string().min(3).max(100).required(),
        price: Joi.number().positive().precision(2).required(),
        description: Joi.string().optional(),
        stock_quantity: Joi.number().integer().min(0).required(),
        category_id: Joi.number().integer().required(),
    }),

    // Testing Schema for validating user registration data
    userRegistration: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(255).required(),
        first_name: Joi.string().min(1).max(100).required(),
        last_name: Joi.string().min(1).max(100).required(),
        phone: Joi.string().min(1).max(20).optional(),
        address: Joi.string().min(1).max(20_000).optional(),
        city: Joi.string().min(1).max(100).optional(),
        postal_code: Joi.string().min(1).max(20).optional(),
        country: Joi.string().min(1).max(100).optional(),
    }),

    userLogin: Joi.object({
        email: Joi.string().min(3).max(100).required(),
        password: Joi.string().min(3).max(100).required(),
    }),
};

// Function to validate data against a schema
const validate = (data, schema) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
        return error.details.map((detail) => detail.message); // Returns an array of error messages
    }
    return null; // No errors
};

export { schemas, validate };
