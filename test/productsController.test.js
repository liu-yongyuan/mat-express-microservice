// tests/app.test.js
import request from "supertest";
import app from "../server.js";

let baseUrl = "/api/v1";

describe(`GET ${baseUrl}/product`, () => {
    it("should fetch all product", async () => {
        try {
            const res = await request(app).get(`${baseUrl}/product`);

            // Check status code
            expect(res.statusCode).toBe(200);

            // Check response body structure
            expect(Array.isArray(res.body)).toBe(true);

            // Validate the content of the response
            expect(res.body[0]).toHaveProperty("product_id");
            expect(res.body[0]).toHaveProperty("name");
        } catch (e) {
            console.error(e);
        }
    });
});

let productId;
describe(`POST ${baseUrl}/product`, () => {
    it("should add a new product", async () => {
        // test logic
        let date = new Date();
        const newProducts = {
            name: `[Jest][testing][insert]SmartPC ${date.toLocaleDateString()}T${date.toLocaleTimeString()}`,
            description: "A high-end SmartPC with a large screen",
            price: 699.99,
            stock_quantity: 50,
            category_id: 2,
        };
        const res = await request(app).post(`${baseUrl}/product`).send(newProducts).set("Authorization", `Bearer ${global.token}`);

        // Check status code
        expect(res.statusCode).toBe(201);

        expect(res.body.message).toBe("Product added successfully");

        productId = res.body.productId;
    });
});

describe(`GET ${baseUrl}/product/:id`, () => {
    it("should find newed product", async () => {
        const res = await request(app).get(`${baseUrl}/product/${productId}`);

        // Check status code
        expect(res.statusCode).toBe(200);

        expect(res.body.product_id).toBe(productId);
    });
});

describe(`PUT ${baseUrl}/product/:id`, () => {
    it("should update product", async () => {
        let date = new Date();
        const products = {
            name: `[Jest][testing][update]SmartPC ${date.toLocaleDateString()}T${date.toLocaleTimeString()}`,
            description: "A high-end SmartPC with a large screen",
            price: 699.99,
            stock_quantity: 50,
            category_id: 2,
        };
        const res = await request(app).put(`${baseUrl}/product/${productId}`).send(products).set("Authorization", `Bearer ${global.token}`);

        // Check status code
        expect(res.statusCode).toBe(200);

        expect(res.body.message).toBe("Product updated successfully");
    });
});

describe(`DELETE ${baseUrl}/post/:id`, () => {
    it("should delete product", async () => {
        const res = await request(app).delete(`${baseUrl}/product/${productId}`).set("Authorization", `Bearer ${global.token}`);

        // Check status code
        expect(res.statusCode).toBe(200);

        expect(res.body.message).toBe("Product deleted successfully");
    });
});
