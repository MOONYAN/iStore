var storeId = '24';

module.exports = {
    storeId: storeId,
    storeName: `Store ${storeId}`,
    storeDB: `mongodb://Apps${storeId}:a1234@104.199.219.156:27017/Apps${storeId}`,
    storeSecret: `store${storeId}`,
    storePath: `/apps${storeId}/istore`
};