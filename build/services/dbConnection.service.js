"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnectionService = void 0;
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
class DbConnectionService {
    constructor() {
        console.info('Creating Mongo client', config_1.config.mongoDbUri);
        this.mongoClient = mongodb_1.MongoClient.connect(encodeURI(config_1.config.mongoDbUri)).then(async (res) => {
            console.info('Mongo client connected!');
            return res;
        });
    }
    static getInstance() {
        if (!DbConnectionService.instance) {
            DbConnectionService.instance = new DbConnectionService();
        }
        return DbConnectionService.instance;
    }
    getMongoClient() {
        return this.mongoClient;
    }
}
exports.DbConnectionService = DbConnectionService;
//# sourceMappingURL=dbConnection.service.js.map