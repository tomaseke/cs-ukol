import {MongoClient} from "mongodb";
const cluster = require('cluster');
import {ConfigFactory} from "../../factories/configFactory";
import {logger} from "../../logger/tslogger";
import {MongoDBConnection} from "../../interfaces/MongoDBConnection";

export class DBConnectionsService implements MongoDBConnection{
    private static instance: DBConnectionsService
    private readonly mongoClient: Promise<MongoClient>
    private readonly config = ConfigFactory.getConfig();
    public static isConnected = false;

    /***
     *
     * @param isMaster true if current thread is master from cluster
     */
    constructor(isMaster?: boolean) {
        logger.info('Creating Mongo client', this.config.mongoDbUri);
        this.mongoClient = MongoClient.connect(encodeURI(this.config.mongoDbUri)).then( async res => {
                logger.info('Mongo client connected!');
                DBConnectionsService.isConnected = true;
                return res;
            }
        );
    }

    public static getInstance(){
        if (!DBConnectionsService.instance){
            DBConnectionsService.instance = new DBConnectionsService(cluster.isMaster)
        }
        return DBConnectionsService.instance;
    }

    public getMongoClient(){
        return this.mongoClient;
    }
}
