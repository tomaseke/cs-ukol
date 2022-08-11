import {BaseControllerInterface} from "./base.controller.interface";
import express, {RequestHandler} from "express";
import {CurrencyService} from "../services/currencyService";
import {SearchFilter} from "../models/SearchFilter";


export class CurrencyController implements BaseControllerInterface{
    path = '/audit';
    router = express.Router();

    constructor(private currencyService: CurrencyService) {
        this.initRouter();
    }

    initRouter(): void {
        this.router.get('/', this.getCurrencies);
    }

    getCurrencies: RequestHandler = async (req: any, res, next: express.NextFunction) => {
        try {
            const name = req.query.name;
            const shortName = req.query.shortName;
            const filter: SearchFilter = {name, shortName};
            const currencies = await this.currencyService.getCurrencies(filter);
            res.status(200).send(currencies);
        }
        catch (e) {
            next(e);
        }
    }
}
