// tests/app.test.js
import request from "supertest";
import app from "../server.js";
import { serverConfig } from "../app.js";

let { baseUrl } = serverConfig;

describe(`GET ${baseUrl}/productes`, () => {
    it("should fetch all products", async () => {
        const res = await request(app).get(`${baseUrl}/products`);

        // Check status code
        expect(res.statusCode).toBe(200);

        // Check response body structure
        expect(Array.isArray(res.body)).toBe(true);

        // Validate the content of the response
        expect(res.body[0]).toHaveProperty("product_id");
        expect(res.body[0]).toHaveProperty("name");
    });
});

let productId;
describe(`POST ${baseUrl}/products`, () => {
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
        const res = await request(app).post(`${baseUrl}/products`).send(newProducts).set("Authorization", `Bearer ${global.token}`);

        // Check status code
        expect(res.statusCode).toBe(201);

        expect(res.body.message).toBe("Product added successfully");

        productId = res.body.productId;
    });
});

describe(`GET ${baseUrl}/products/:id`, () => {
    it("should find newed product", async () => {
        const res = await request(app).get(`${baseUrl}/products/${productId}`);

        // Check status code
        expect(res.statusCode).toBe(200);

        expect(res.body.product_id).toBe(productId);
    });
});

describe(`PUT ${baseUrl}/products/:id`, () => {
    it("should update product", async () => {
        let date = new Date();
        const products = {
            name: `[Jest][testing][update]SmartPC ${date.toLocaleDateString()}T${date.toLocaleTimeString()}`,
            description: "A high-end SmartPC with a large screen",
            price: 699.99,
            stock_quantity: 50,
            category_id: 2,
        };
        const res = await request(app).put(`${baseUrl}/products/${productId}`).send(products).set("Authorization", `Bearer ${global.token}`);

        // Check status code
        expect(res.statusCode).toBe(200);

        expect(res.body.message).toBe("Product updated successfully");
    });
});

describe(`DELETE ${baseUrl}/post/:id`, () => {
    it("should delete product", async () => {
        const res = await request(app).delete(`${baseUrl}/products/${productId}`).set("Authorization", `Bearer ${global.token}`);

        // Check status code
        expect(res.statusCode).toBe(200);

        expect(res.body.message).toBe("Product deleted successfully");
    });
});
