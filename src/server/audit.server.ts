import express from 'express';
import {BaseControllerInterface} from "../controllers/base.controller.interface";
import {errorHandlerMiddleware} from "../middlewares/errorHandler.middleware";
import {logger} from '../logger/tslogger';

const bodyParser = require('body-parser');
const helmet = require("helmet");

export class AuditServer {
    public app: express.Application
    public port: number;

    constructor(port, controllers: BaseControllerInterface[]) {
        this.app = express();
        this.app.use(helmet());

        this.port = port;

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded());

        this.app.use(express.json());

        this.initControllers(controllers);
        this.app.use(errorHandlerMiddleware);
    }

    listen() {
        return this.app.listen(this.port, () => {
            logger.info(`DecisionRules audit server listening on the port ${this.port}`);
        });
    }

    private initControllers(controllers: BaseControllerInterface[]) {
        controllers.forEach(controller => {
            this.app.use(controller.path, controller.router);
        });
    }
}
