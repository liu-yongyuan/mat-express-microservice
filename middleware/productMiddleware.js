import { notProductOwnership } from "../models/productOwnershipModel";

const productOwnershipCheckMiddleware = (req, res, next) => {
    const { id } = req.params;
    const { customer_id, is_admin } = req.user; // Assuming user info is stored in req.user
    if (is_admin) {
        return next(); // Admins are allowed to delete any product
    }

    notProductOwnership(id, customer_id).then((res) => {
        if (res) {
            return res.status(403).json({ error: "Not authorized to delete this product" });
        } else {
            next();
        }
    });
};

export { productOwnershipCheckMiddleware };
