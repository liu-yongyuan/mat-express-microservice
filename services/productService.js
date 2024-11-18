import {
    searchElasticsearch,
    elasticsearchIndex,
    elasticCheckIndex,
    indexElasticsearch,
    elasticCreateIndex,
    elasticDeleteIndex,
} from "../utils/elasticsearchHelper.js";
import { cacheData, getCachedData, delCachedData, cachedKey } from "../utils/redisHelper.js";
import { deleteProducOwnership, insertProductOwnership } from "../models/productOwnershipModel.js";
import {
    deleteProductById,
    getProductById,
    insertProduct,
    updateProduct,
    listAllProduct,
} from "../models/productModel.js";

async function buildIndexToElasticSearch() {
    const listDatas = await listAll();
    if (!listDatas) {
        return;
    }
    const indexReady = await elasticCheckIndex(elasticsearchIndex.productTable);
    if (indexReady) {
        await elasticDeleteIndex(elasticsearchIndex.productTable);
    }
    // create
    await elasticCreateIndex(elasticsearchIndex.productTable);
    listDatas.forEach((item) => {
        indexElasticsearch(elasticsearchIndex.productTable, item.id, item);
    });
}

async function searchByKeywords(keywords) {
    if (!keywords) {
        return [];
    }
    const indexReady = await elasticCheckIndex(elasticsearchIndex.productTable);
    if (!indexReady) {
        return [];
    }
    const searchProperty = {
        name: keywords,
    };
    const searchResponse = await searchElasticsearch(elasticsearchIndex.productTable, searchProperty);
    return searchResponse ?? [];
}

async function listAll() {
    const listDatas = await getCachedData(cachedKey.listAllProducts);
    if (listDatas) {
        return listDatas;
    }
    const rows = await listAllProduct();
    if (rows) {
        await cacheData(cachedKey.listAllProducts, rows);
    }
    return rows;
}

async function getById(productId) {
    const idKey = `${cachedKey.product}_${productId}`;
    const dataByCache = await getCachedData(idKey);
    if (dataByCache) {
        return dataByCache;
    }
    const data = await getProductById(productId);
    if (data) {
        await cacheData(idKey, data);
    }
    return data;
}

async function addProduct(product, customerId) {
    // insert
    const productId = await insertProduct(product);
    if (!productId) {
        throw new Error("insert error");
    }
    // insert relation
    await insertProductOwnership(productId, customerId);
    // delete cache
    delCachedData(cachedKey.listAllProducts);

    return productId;
}

async function updateProductById(product) {
    // update mysql
    await updateProduct(product);

    // delete cached
    delCachedData(`${cachedKey.product}_${product.product_id}`);

    // delete cache
    delCachedData(cachedKey.listAllProducts);
}

async function deleteProduct(productId, customerId) {
    // delete
    const count = await deleteProductById(productId);
    if (Object.is(count, 0)) {
        throw new Error("Product not found");
    }
    // delete relation
    await deleteProducOwnership(productId, customerId);
    // delete cache
    delCachedData(`${cachedKey.product}_${productId}`);
    // delete cache
    delCachedData(cachedKey.listAllProducts);
}

export { listAll, getById, addProduct, updateProductById, deleteProduct, searchByKeywords, buildIndexToElasticSearch };
