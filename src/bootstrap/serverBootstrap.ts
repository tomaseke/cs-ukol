import {Server} from "../server/server";
import {CurrencyController} from "../controllers/currency.controller";
import {CurrencyService} from "../services/currency.service";
import {MostIncreasingCurrenciesController} from "../controllers/mostIncreasingCurrencies.controller";
import {MostIncreasingCurrenciesService} from "../services/mostIncreasingCurrenciesService";

export class ServerBootstrap {

    protected server: Server;
    protected currencyService;
    protected mostVolatileCurrenciesService;

    constructor() {
        this.currencyService = new CurrencyService();
        this.mostVolatileCurrenciesService = new MostIncreasingCurrenciesService();
    }

    initServer(): void {
        const port = process.env.PORT || 8080;
        // this might be an overkill for such simple app, but this design has proven as easily extendable
        this.server = new Server(Number.parseInt(port.toString()), [
                new CurrencyController(this.currencyService),
                new MostIncreasingCurrenciesController(this.mostVolatileCurrenciesService)
            ]
        );
        this.server.listen();
    }
}
