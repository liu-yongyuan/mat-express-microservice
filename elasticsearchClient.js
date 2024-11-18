import fs from "fs";
import yaml from "js-yaml";

/*
Use the createRequire Function
Since @elastic/elasticsearch is a CommonJS package, you can use Node.js's 
built-in module.createRequire to import it in an ES Module project:
 */
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Client } = require("@elastic/elasticsearch");

let elasticsearchClient = null;
async function initializeElasticsearch() {
    // Load the Elasticsearch configuration from the YAML file
    const config = yaml.load(fs.readFileSync("./config/elasticsearchConfig.yaml", "utf8"));

    // Extract the Elasticsearch configuration from the loaded YAML object
    const envConfig = config.elasticsearch[process.env.NODE_ENV];

    // console.log(config, envConfig)

    elasticsearchClient = new Client({
        node: envConfig.node, // Replace with your Elasticsearch URL
        auth: {
            username: envConfig.username, // Your username
            password: envConfig.password, // Your password
        },
        requestTimeout: 100
    });

    return elasticsearchClient;
}

export { elasticsearchClient, initializeElasticsearch };
