import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getByEmail, insert } from "../models/customersModel.js";
import logger from "../utils/logger.js";
import { schemas, validate } from "../utils/validator.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
    try {
        logger.info(`login in the body: ${JSON.stringify(req.body)}`);
        const errors = validate(req.body, schemas.userLogin);
        if (errors) {
            return res.status(400).json({ errors }); // Send validation errors as response
        }

        if (!JWT_SECRET) {
            logger.error(`JWT_SECRET is nothing`);
        }

        const { email, password } = req.body;
        const user = await getByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the password with the hashed password stored in the database
        /* const isPasswordValid = await bcrypt.compare(password, user.password);
         if (!isPasswordValid) {
             return res.status(401).json({ message: 'Invalid password' });
         } */
        if (!Object.is(password, user.password)) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { customer_id: user.customer_id, email: user.email, is_admin: user.is_admin },
            JWT_SECRET,
            { expiresIn: "24h" }, // Token expiration time
        );

        // Send the token in the response
        res.json({ message: "Login successful", token });
    } catch (e) {
        logger.error(e);
        res.sendStatus(500).json({ error: "Database query failed" });
    }
};

export const registration = async (req, res) => {
    try {
        const errors = validate(req.body, schemas.userRegistration);
        if (errors) {
            return res.status(400).json({ errors });
        }

        const { email, password } = req.body();
        const existingUser = await getByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        //  Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const customerData = Object.assign(req.body, {
            password: hashedPassword,
        });
        const customerId = await insert(customerData);
        res.status(201).json({
            message: "User registered successfully",
            customerId,
        });
    } catch (e) {
        logger.error(e);
        res.status(500).json({
            message: "Something went wrong, please try again later",
        });
    }
};
