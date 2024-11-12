// setupTests.js
import request from "supertest";
import app from "./server.js";
import logger from "./utils/logger.js";

let baseUrl = "/api/v1";

global.token = null;

beforeAll(async () => {
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

    logger.info(`login success`, `get the token`, { token: global.token });
});
