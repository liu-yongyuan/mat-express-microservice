// setupTests.js
import request from "supertest";
import app, { serverPromise } from "./server.js";

let baseUrl = "/api/v1";

global.token = null;

beforeAll(async () => {
    try {
        await serverPromise;

        const john = {
            email: "matt.liu@onlinestore.com",
            password: "Abc.123.Zxc",
        };
        const res = await request(app).post(`${baseUrl}/login`).send(john);

        // Check status code
        expect(res.statusCode).toBe(200);

        expect(res.body.token).toBeDefined();

        // Store the token for future use in protected route tests
        global.token = res.body.token;

        console.info(`login success`, `get the token`, { token: global.token });
    } catch (error) {
        console.error(error);
    }
});
