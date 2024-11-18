import { elasticsearchClient } from "../elasticsearchClient.js";

const elasticsearchIndex = {
    productTable: "product",
};

async function elasticCreateIndex(index) {
    return elasticsearchClient.indices.create({ index });
}

async function elasticCheckIndex(index) {
    return elasticsearchClient.indices.exists({ index });
}

async function elasticDeleteIndex(index) {
    return elasticsearchClient.indices.delete({ index });
}

async function indexElasticsearch(index, id, data) {
    await elasticsearchClient.index({
        index,
        id,
        body: data,
    });
}

async function refreshElasticsearch(index) {
    await elasticsearchClient.indices.refresh({ index });
}

async function searchElasticsearch(index, query) {
    const result = await elasticsearchClient.search({
        index,
        body: {
            query: {
                match: query,
            },
        },
    });
    return result?.hits?.hits?.map((hit) => hit._source);
}

export {
    elasticsearchIndex,
    refreshElasticsearch,
    indexElasticsearch,
    searchElasticsearch,
    elasticCheckIndex,
    elasticCreateIndex,
    elasticDeleteIndex,
};
