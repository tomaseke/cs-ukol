import express, {NextFunction} from "express";
import {BodyValidatorBase} from "../validators/BodyValidatorBase";


export function validateCurrencyMiddleware(request: express.Request, response: express.Response, next: NextFunction) {
    try {
        const validator = new BodyValidatorBase(request);
        validator.validate();
        next();
    } catch (e) {
        next(e);
    }
}
