import express, {RequestHandler} from "express";
import {MostIncreasingCurrenciesService} from "../services/mostIncreasingCurrenciesService";
import {validateQueryMiddleware} from "../middlewares/validateQuery.middleware";


export class MostIncreasingCurrenciesController {
    path = '/most-increasing';
    router = express.Router();

    constructor(private mostIncreasingCurrenciesService: MostIncreasingCurrenciesService) {
        this.initRouter();
    }

    initRouter(): void {
        this.router.get('/', validateQueryMiddleware, this.getMostIncreasingCurrencies);
    }

    getMostIncreasingCurrencies: RequestHandler = async (req: any, res, next: express.NextFunction) => {
        try {
            const isoDate = req.query.date;
            const numberOfTheMostIncreasingCurrs = Number(req.query.count);
            const mostIncreasing = this.mostIncreasingCurrenciesService.getMostIncreasingCurrencies(isoDate, numberOfTheMostIncreasingCurrs);
            res.status(200).send(mostIncreasing);
        }
        catch (e) {
            next(e);
        }
    }
}
