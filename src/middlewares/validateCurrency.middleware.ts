import express, {NextFunction} from "express";
import {validateCurrency} from "../validators/BodyValidator";


export function validateCurrencyMiddleware(request: express.Request, response: express.Response, next: NextFunction) {
    try {
       validateCurrency(request.body);
       next();
    }
    catch (e) {
        next(e);
    }
}
