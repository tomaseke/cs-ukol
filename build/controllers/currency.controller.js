"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyController = void 0;
const express_1 = __importDefault(require("express"));
const validateCurrency_middleware_1 = require("../middlewares/validateCurrency.middleware");
class CurrencyController {
    constructor(currencyService) {
        this.currencyService = currencyService;
        this.path = '/currencies';
        this.router = express_1.default.Router();
        this.getCurrencies = async (req, res, next) => {
            try {
                const filter = CurrencyController.getQueryParams(req);
                const currencies = await this.currencyService.getCurrencies(filter);
                res.status(200).send(currencies);
            }
            catch (e) {
                next(e);
            }
        };
        this.createCurrency = async (req, res, next) => {
            try {
                const currency = req.body;
                await this.currencyService.createCurrency(currency);
                res.status(200).send();
            }
            catch (e) {
                next(e);
            }
        };
        this.updateCurrency = async (req, res, next) => {
            try {
                const currency = req.body;
                await this.currencyService.updateCurrency(currency);
                res.status(200).send();
            }
            catch (e) {
                next(e);
            }
        };
        this.deleteCurrency = async (req, res, next) => {
            try {
                const filter = CurrencyController.getQueryParams(req);
                await this.currencyService.deleteCurrency(filter);
                res.status(200).send();
            }
            catch (e) {
                next(e);
            }
        };
        this.initRouter();
    }
    initRouter() {
        this.router.get('/', this.getCurrencies);
        this.router.post('/', validateCurrency_middleware_1.validateCurrencyMiddleware, this.createCurrency);
        this.router.patch('/', validateCurrency_middleware_1.validateCurrencyMiddleware, this.updateCurrency);
        this.router.delete('/', this.deleteCurrency);
    }
    static getQueryParams(request) {
        return { name: request.query.name, shortName: request.query.short_name };
    }
}
exports.CurrencyController = CurrencyController;
//# sourceMappingURL=currency.controller.js.map