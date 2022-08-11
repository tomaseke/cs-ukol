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
            const isoDate = req.query.date;
            const numberOfTheMostVolatileCurrs = Number(req.query.count);
            const mostVolatile = this.mostVolatileCurrenciesService.getMostVolatileCurrencies(isoDate, numberOfTheMostVolatileCurrs);
            res.status(200).send(mostVolatile);
        }
        catch (e) {
            next(e);
        }
    }
}
