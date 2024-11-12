import fs from "fs";
import yaml from "js-yaml";
import mysql from "mysql2";

// Promisify pool query for async/await
let mysqlPool = null;

async function initializeMysqlPool() {
    // Load the MySQL configuration from the YAML file
    const config = yaml.load(fs.readFileSync("./config/dbConfig.yaml", "utf8"));

    // Extract the MySQL configuration from the loaded YAML object
    const mysqlConfig = config.mysql[process.env.NODE_ENV];

    try {
        // Create a MySQL connection pool
        const pool = mysql.createPool({
            host: mysqlConfig.host,
            user: mysqlConfig.user,
            password: mysqlConfig.password,
            database: mysqlConfig.database,
            waitForConnections: mysqlConfig.waitForConnections,
            connectionLimit: mysqlConfig.connectionLimit,
            connectTimeout: mysqlConfig.connectTimeout,
            queueLimit: mysqlConfig.queueLimit,
        });
        mysqlPool = pool.promise();
    } catch (e) {
        console.error("[initializeMySql][error]", e);
    }
}

export { initializeMysqlPool, mysqlPool };
