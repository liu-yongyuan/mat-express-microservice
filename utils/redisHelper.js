import { redisClient } from "../redisClient.js";

// l_all => list all xxx
// r_product => row_xxx
const cachedKey = {
    listAllProducts: "l_all_products",
    product: "r_product",
};

// Cache Function
async function cacheData(key, data, timeoutSeconds = 3600) {
    await redisClient.set(key, JSON.stringify(data), "EX", timeoutSeconds); // Cache expires in 1 hour
}

async function getCachedData(key) {
    const cached = await redisClient.get(key);
    return cached ? JSON.parse(cached) : null;
}

async function delCachedData(key) {
    await redisClient.del(key);
}

export { cachedKey };
export { cacheData, getCachedData, delCachedData };
