"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const errorHandler_middleware_1 = require("../middlewares/errorHandler.middleware");
const bodyParser = require('body-parser');
class Server {
    constructor(port, controllers) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded());
        this.initControllers(controllers);
        this.app.use(errorHandler_middleware_1.errorHandlerMiddleware);
    }
    listen() {
        return this.app.listen(this.port, () => console.log(`Server listening on port ${this.port}`));
    }
    initControllers(controllers) {
        controllers.forEach(controller => this.app.use(controller.path, controller.router));
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map