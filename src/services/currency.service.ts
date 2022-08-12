import {Collection, Db, MongoClient} from "mongodb";
import {DbConnectionService} from "./dbConnection.service";
import {CurrencyModel} from "../models/currency.model";
import {SearchFilterModel} from "../models/searchFilter.model";
import {HttpException} from "../exceptions/httpException";
import {config} from "../config";

export class CurrencyService {

    client: MongoClient;
    db: Db;
    collection: Collection;

    constructor() {
        this.connectDB().then()
    }

    async connectDB() {
        const dbConnection = DbConnectionService.getInstance();
        this.client = await dbConnection.getMongoClient();
        this.db = this.client.db(config.mongoDatabase);
        this.collection = this.db.collection(config.mongoCollectionCurrencies);
    }

    async getCurrencies(queryParams): Promise<CurrencyModel[]> {
        try {
            const filter = this.createFilter(queryParams);
            return await this.collection.find(filter).toArray() as unknown as CurrencyModel[];
        }
        catch (e) {
            console.error(e);
            throw new HttpException(500, 'Cannot get currencies.')
        }
    }

    async createCurrency(currency: CurrencyModel): Promise<void> {
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

    async updateCurrency(currency: CurrencyModel): Promise<void> {
        try {
            const filter = { shortName: currency.shortName };
            await this.collection.replaceOne(filter, currency);
        }
        catch (e) {
            console.error(e);
            throw new HttpException(500, 'Cannot update currency.')
        }
    }

    async deleteCurrency(queryParams: SearchFilterModel): Promise<void> {
        try {
            const filter = this.createFilter(queryParams);
            await this.collection.deleteOne(filter);
        }
        catch (e) {
            console.error(e);
            throw new HttpException(500, 'Cannot delete currency.')
        }
    }

    private createFilter(queryParams: SearchFilterModel): SearchFilterModel {
        const filter = {} as SearchFilterModel;
        if(queryParams.name){
            filter.name = queryParams.name;
        }
        if(queryParams.shortName){
            filter.shortName = queryParams.shortName;
        }
        return filter;
    }
}
