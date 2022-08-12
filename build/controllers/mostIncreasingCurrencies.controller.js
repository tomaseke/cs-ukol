"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MostIncreasingCurrenciesController = void 0;
const express_1 = __importDefault(require("express"));
const validateQuery_middleware_1 = require("../middlewares/validateQuery.middleware");
class MostIncreasingCurrenciesController {
    constructor(mostIncreasingCurrenciesService) {
        this.mostIncreasingCurrenciesService = mostIncreasingCurrenciesService;
        this.path = '/most-increasing';
        this.router = express_1.default.Router();
        this.getMostIncreasingCurrencies = async (req, res, next) => {
            try {
                const isoDate = req.query.date;
                const numberOfTheMostIncreasingCurrs = Number(req.query.count);
                const mostIncreasing = this.mostIncreasingCurrenciesService.getMostIncreasingCurrencies(isoDate, numberOfTheMostIncreasingCurrs);
                res.status(200).send(mostIncreasing);
            }
            catch (e) {
                next(e);
            }
        };
        this.initRouter();
    }
    initRouter() {
        this.router.get('/', validateQuery_middleware_1.validateQueryMiddleware, this.getMostIncreasingCurrencies);
    }
}
exports.MostIncreasingCurrenciesController = MostIncreasingCurrenciesController;
//# sourceMappingURL=mostIncreasingCurrencies.controller.js.map