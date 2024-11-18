import { elasticsearchClient } from "../elasticsearchClient.cjs";

const elasticsearchIndex = {
    productTable: "product",
};

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
    const { body } = await elasticsearchClient.search({
        index,
        body: {
            query: {
                match: { name: query },
            },
        },
    });
    return body.hits.hits.map((hit) => hit._source);
}

export { elasticsearchIndex, refreshElasticsearch, indexElasticsearch, searchElasticsearch };
