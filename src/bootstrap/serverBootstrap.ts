import {Server} from "../server/server";
import {CurrencyController} from "../controllers/currency.controller";
import {CurrencyService} from "../services/currency.service";
import {MostVolatileCurrenciesController} from "../controllers/mostVolatileCurrencies.controller";
import {MostVolatileCurrenciesService} from "../services/mostVolatileCurrencies.service";

export class ServerBootstrap {

    protected server: Server;
    protected currencyService;
    protected mostVolatileCurrenciesService;

    constructor() {
        this.currencyService = new CurrencyService();
        this.mostVolatileCurrenciesService = new MostVolatileCurrenciesService();
    }

    initServer(): void {
        const port = process.env.PORT || 8080;
        this.server = new Server(Number.parseInt(port.toString()), [
                new CurrencyController(this.currencyService),
                new MostVolatileCurrenciesController(this.mostVolatileCurrenciesService)
            ]
        );
        this.server.listen();
    }
}
