import {DatabaseServiceInterface} from "./databases/database.service.interface";
import {Collection, Db, MongoClient} from "mongodb";
import {BaseService} from "./base.service";
import {DBConnectionsService} from "./databases/DBConnections.service";
import {Currency} from "../models/Currency";
import {SearchFilter} from "../models/SearchFilter";

export class CurrencyService extends BaseService implements DatabaseServiceInterface{

    client: MongoClient;
    db: Db;
    collection: Collection;

    constructor() {
        super();
        this.connectDB().then()
    }

    async connectDB() {
        const dbConnection = DBConnectionsService.getInstance();
        this.client = await dbConnection.getMongoClient();
        this.db = this.client.db(this.config.mongoDatabase);
        this.collection = this.db.collection(this.config.mongoCollectionCurrencies);
    }

    async getCurrencies(queryParams): Promise<Currency[]> {
        const filter = this.createFilter(queryParams);
        return await this.collection.find(filter).toArray() as unknown as Currency[];
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
}
