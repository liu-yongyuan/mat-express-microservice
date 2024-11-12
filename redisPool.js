import fs from "fs";
import yaml from "js-yaml";
import dotenv from "dotenv";
import redis from "redis";
import logger from './utils/logger.js'

// Load environment variables from .env file
dotenv.config();
// Load the Redis configuration from the YAML file
const config = yaml.load(fs.readFileSync("./config/redisConfig.yaml", "utf8"));

// Extract the Redis configuration from the loaded YAML object
const redisConfig = config.redis[process.env.NODE_ENV];

let redisClient = null;
async function initializeRedisClient() {
    redisClient = redis
        .createClient({
            url: `redis://${redisConfig.host}:${redisConfig.port}`,
            password: redisConfig.password,
            database: redisConfig.db,
        })
        .on("error", (e) => {
            console.error(`Failed to create the Redis client with error:`);
            console.error(e);
        });

    try {
        await redisClient.connect();
        logger.info("Connected to Redis", redisConfig);
    } catch (e) {
        console.error(`Connection to Redis failed with error:`);
        console.error(e);
    }
}

export { initializeRedisClient, redisClient };
