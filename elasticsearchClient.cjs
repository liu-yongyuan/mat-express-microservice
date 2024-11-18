const fs = require("fs");
const yaml = require("js-yaml");
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
    });

    return elasticsearchClient;
}

module.exports = { initializeElasticsearch, elasticsearchClient };
