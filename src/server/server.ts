import express from 'express';
import {errorHandlerMiddleware} from "../middlewares/errorHandler.middleware";
import {BaseControllerInterface} from "../controllers/base.controller.interface";

const bodyParser = require('body-parser');

export class Server {
    public app: express.Application
    public port: number;

    constructor(port, controllers: BaseControllerInterface[]) {
        this.app = express();
        this.port = port;
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded());
        this.app.use(express.json());
        this.app.use(errorHandlerMiddleware);
        this.initControllers(controllers);
    }

    listen() {
        return this.app.listen(this.port, () => {

        });
    }

    private initControllers(controllers: BaseControllerInterface[]) {
        controllers.forEach(controller => {
            this.app.use(controller.path, controller.router);
        });
    }
}
