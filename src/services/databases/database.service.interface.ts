import {Db, MongoClient} from "mongodb";

export interface DatabaseServiceInterface{
    client: MongoClient;
    db: Db;
    connectDB();
}