import {MongoClient} from "mongodb";
import {config} from "../config";

export class DbConnectionService {
    private static instance: DbConnectionService
    private readonly mongoClient: Promise<MongoClient>

    constructor() {
        console.info('Creating Mongo client', config.mongoDbUri);
        this.mongoClient = MongoClient.connect(encodeURI(config.mongoDbUri)).then( async res => {
                console.info('Mongo client connected!');
                return res;
            }
        );
    }

    static getInstance(){
        if (!DbConnectionService.instance){
            DbConnectionService.instance = new DbConnectionService();
        }
        return DbConnectionService.instance;
    }

    getMongoClient(){
        return this.mongoClient;
    }
}
