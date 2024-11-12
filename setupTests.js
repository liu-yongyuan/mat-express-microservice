// setupTests.js
import request from "supertest";
import app from "./server.js";
import { serverConfig } from "./app.js";
import logger from "./utils/logger.js";

let { baseUrl } = serverConfig;

global.token = null;

beforeAll(async () => {
    const john = {
        email: "john.doe@example.com",
        password: "password123",
    };
    const res = await request(app).post(`${baseUrl}/login`).send(john);

    console.log(res.body);

    // Check status code
    expect(res.statusCode).toBe(200);

    expect(res.body.token).toBeDefined();

    // Store the token for future use in protected route tests
    global.token = res.body.token;

    logger.info(`login success`, `get the token`, { token: global.token });
});
