import express, {RequestHandler} from "express";
import {CurrencyService} from "../services/currency.service";
import {SearchFilterModel} from "../models/searchFilter.model";
import {validateCurrencyMiddleware} from "../middlewares/validateCurrency.middleware";
import {BaseControllerInterface} from "./base.controller.interface";


export class CurrencyController implements BaseControllerInterface{
    path = '/currencies';
    router = express.Router();

    constructor(private currencyService: CurrencyService) {
        this.initRouter();
    }

    initRouter(): void {
        this.router.get('/', this.getCurrencies);
        this.router.post('/', validateCurrencyMiddleware, this.createCurrency);
        this.router.patch('/', validateCurrencyMiddleware, this.updateCurrency);
        this.router.delete('/', this.deleteCurrency);
    }

    getCurrencies: RequestHandler = async (req: any, res, next: express.NextFunction) => {
        try {
            const filter: SearchFilterModel = CurrencyController.getQueryParams(req);
            const currencies = await this.currencyService.getCurrencies(filter);
            res.status(200).send(currencies);
        }
        catch (e) {
            next(e);
        }
    }

    createCurrency: RequestHandler = async (req: any, res, next: express.NextFunction) => {
        try {
            const currency = req.body;
            await this.currencyService.createCurrency(currency);
            res.status(200).send();
        }
        catch (e) {
            next(e);
        }
    }

    updateCurrency: RequestHandler = async (req: any, res, next: express.NextFunction) => {
        try {
            const currency = req.body;
            await this.currencyService.updateCurrency(currency);
            res.status(200).send();
        }
        catch (e) {
            next(e);
        }
    }

    deleteCurrency: RequestHandler = async (req: any, res, next: express.NextFunction) => {
        try {
            const filter: SearchFilterModel = CurrencyController.getQueryParams(req);
            await this.currencyService.deleteCurrency(filter);
            res.status(200).send();
        }
        catch (e) {
            next(e);
        }
    }

    static getQueryParams(request: express.Request) {
        return {name: request.query.name, shortName: request.query.short_name};
    }
}
