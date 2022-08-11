export let config;

config = function () {
    return configuration;
}

let configuration;
configuration = {
    mongoDbUri: process.env.MONGO_DB_URI,
    mongoDatabase: 'Homework',
    mongoCollectionCurrencies: 'Currencies'
}
