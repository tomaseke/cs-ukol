"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerBootstrap = void 0;
const server_1 = require("../server/server");
const currency_controller_1 = require("../controllers/currency.controller");
const currency_service_1 = require("../services/currency.service");
const mostIncreasingCurrencies_controller_1 = require("../controllers/mostIncreasingCurrencies.controller");
const mostIncreasingCurrenciesService_1 = require("../services/mostIncreasingCurrenciesService");
class ServerBootstrap {
    constructor() {
        this.currencyService = new currency_service_1.CurrencyService();
        this.mostIncreasingCurrenciesService = new mostIncreasingCurrenciesService_1.MostIncreasingCurrenciesService();
    }
    initServer() {
        const port = process.env.PORT || 8080;
        // this might be an overkill for such a simple app, but this design has proven as easily extendable
        this.server = new server_1.Server(Number.parseInt(port.toString()), [
            new currency_controller_1.CurrencyController(this.currencyService),
            new mostIncreasingCurrencies_controller_1.MostIncreasingCurrenciesController(this.mostIncreasingCurrenciesService)
        ]);
        this.server.listen();
    }
}
exports.ServerBootstrap = ServerBootstrap;
//# sourceMappingURL=serverBootstrap.js.map