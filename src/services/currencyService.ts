import {Collection, Db, MongoClient} from "mongodb";
import {DBConnectionsService} from "./databases/DBConnections.service";
import {Currency} from "../models/Currency";
import {SearchFilter} from "../models/SearchFilter";
import {HttpException} from "../exceptions/HttpException";
import {config} from "../config";

export class CurrencyService{

    client: MongoClient;
    db: Db;
    collection: Collection;

    constructor() {
        this.connectDB().then()
    }

    async connectDB() {
        const dbConnection = DBConnectionsService.getInstance();
        this.client = await dbConnection.getMongoClient();
        this.db = this.client.db(config.mongoDatabase);
        this.collection = this.db.collection(config.mongoCollectionCurrencies);
    }

    async getCurrencies(queryParams): Promise<Currency[]> {
        try {
            const filter = this.createFilter(queryParams);
            return await this.collection.find(filter).toArray() as unknown as Currency[];
        }
        catch (e) {
            console.error(e);
            throw new HttpException(500, 'Cannot get currencies.')
        }
    }

    private createFilter(queryParams: SearchFilter) {
        const filter = {} as SearchFilter;
        if(queryParams.name){
            filter.name = queryParams.name;
        }
        if(queryParams.shortName){
            filter.shortName = queryParams.shortName;
        }
        return filter;
    }

    async createCurrency(currency: Currency) {
        try {
            const hasSomeCurrencySameShortName = await this.collection.findOne({shortName: currency.shortName});
            if(hasSomeCurrencySameShortName) {
                throw new HttpException(400, 'A currency with this exact short name already exists and therefore cannot be created.')
            }
            await this.collection.insertOne(currency);
        }
        catch (e) {
            console.error(e);
            if(e instanceof HttpException) {
                throw e;
            }
            throw new HttpException(500, 'Cannot create currency.')
        }
    }

    async updateCurrency(currency: Currency) {
        try {
            const filter = { shortName: currency.shortName };
            await this.collection.updateOne(filter, {$set: currency});
        }
        catch (e) {
            console.error(e);
            throw new HttpException(500, 'Cannot update currency.')
        }
    }

    async deleteCurrency(queryParams: SearchFilter) {
        try {
            const filter = this.createFilter(queryParams);
            await this.collection.deleteOne(filter);
        }
        catch (e) {
            console.error(e);
            throw new HttpException(500, 'Cannot delete currency.')
        }
    }
}
