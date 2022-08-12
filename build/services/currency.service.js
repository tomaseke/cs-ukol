"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyService = void 0;
const dbConnection_service_1 = require("./dbConnection.service");
const httpException_1 = require("../exceptions/httpException");
const config_1 = require("../config");
class CurrencyService {
    constructor() {
        this.connectDB().then();
    }
    async connectDB() {
        const dbConnection = dbConnection_service_1.DbConnectionService.getInstance();
        this.client = await dbConnection.getMongoClient();
        this.db = this.client.db(config_1.config.mongoDatabase);
        this.collection = this.db.collection(config_1.config.mongoCollectionCurrencies);
    }
    async getCurrencies(queryParams) {
        try {
            const filter = this.createFilter(queryParams);
            return await this.collection.find(filter).toArray();
        }
        catch (e) {
            console.error(e);
            throw new httpException_1.HttpException(500, 'Cannot get currencies.');
        }
    }
    async createCurrency(currency) {
        try {
            const hasSomeCurrencySameShortName = await this.collection.findOne({ shortName: currency.shortName });
            if (hasSomeCurrencySameShortName) {
                throw new httpException_1.HttpException(400, 'A currency with this exact short name already exists and therefore cannot be created.');
            }
            await this.collection.insertOne(currency);
        }
        catch (e) {
            console.error(e);
            if (e instanceof httpException_1.HttpException) {
                throw e;
            }
            throw new httpException_1.HttpException(500, 'Cannot create currency.');
        }
    }
    async updateCurrency(currency) {
        try {
            const filter = { shortName: currency.shortName };
            await this.collection.updateOne(filter, { $set: currency });
        }
        catch (e) {
            console.error(e);
            throw new httpException_1.HttpException(500, 'Cannot update currency.');
        }
    }
    async deleteCurrency(queryParams) {
        try {
            const filter = this.createFilter(queryParams);
            await this.collection.deleteOne(filter);
        }
        catch (e) {
            console.error(e);
            throw new httpException_1.HttpException(500, 'Cannot delete currency.');
        }
    }
    createFilter(queryParams) {
        const filter = {};
        if (queryParams.name) {
            filter.name = queryParams.name;
        }
        if (queryParams.shortName) {
            filter.shortName = queryParams.shortName;
        }
        return filter;
    }
}
exports.CurrencyService = CurrencyService;
//# sourceMappingURL=currency.service.js.map