import express from 'express';
import {errorHandlerMiddleware} from "../middlewares/errorHandler.middleware";
import {BaseControllerInterface} from "../controllers/base.controller.interface";

const bodyParser = require('body-parser');

export class Server {
    app: express.Application
    port: number;

    constructor(port, controllers: BaseControllerInterface[]) {
        this.app = express();
        this.port = port;
        this.initControllers(controllers);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded());
        this.app.use(errorHandlerMiddleware);
    }

    listen() {
        return this.app.listen(this.port, () => console.log(`Server listening on port ${this.port}`));
    }

    private initControllers(controllers: BaseControllerInterface[]) {
        controllers.forEach(controller => this.app.use(controller.path, controller.router));
    }
}
