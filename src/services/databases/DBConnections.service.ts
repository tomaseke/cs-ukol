import {MongoClient} from "mongodb";
import {config} from "../../config";

export class DBConnectionsService{
    private static instance: DBConnectionsService
    private readonly mongoClient: Promise<MongoClient>

    constructor() {
        console.info('Creating Mongo client', config.mongoDbUri);
        this.mongoClient = MongoClient.connect(encodeURI(config.mongoDbUri)).then( async res => {
                console.info('Mongo client connected!');
                return res;
            }
        );
    }

    public static getInstance(){
        if (!DBConnectionsService.instance){
            DBConnectionsService.instance = new DBConnectionsService()
        }
        return DBConnectionsService.instance;
    }

    public getMongoClient(){
        return this.mongoClient;
    }
}
