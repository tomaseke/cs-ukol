import express, {RequestHandler} from "express";
import {MostVolatileCurrenciesService} from "../services/mostVolatileCurrencies.service";


export class MostVolatileCurrenciesController{
    path = '/most-volatile';
    router = express.Router();

    constructor(private mostVolatileCurrenciesService: MostVolatileCurrenciesService) {
        this.initRouter();
    }

    initRouter(): void {
        this.router.get('/', this.getMostVolatileCurrencies);
    }

    getMostVolatileCurrencies: RequestHandler = async (req: any, res, next: express.NextFunction) => {
        try {
            const fromDate = new Date(req.query.date);
            const numberOfTheMostVolatileCurrs = Number(req.query.count);
            const mostVolatile = this.mostVolatileCurrenciesService.getMostVolatileCurrencies(fromDate, numberOfTheMostVolatileCurrs);
            res.status(200).send();
        }
        catch (e) {
            next(e);
        }
    }
}
