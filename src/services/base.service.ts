import {ConfigFactory} from "../factories/configFactory";

export class BaseService{
    readonly config = ConfigFactory.getConfig();
}