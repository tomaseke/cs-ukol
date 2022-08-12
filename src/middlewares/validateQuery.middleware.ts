import express, {NextFunction} from "express";
import {HttpException} from "../exceptions/httpException";
import moment from "moment";


export function validateQueryMiddleware(request: express.Request, response: express.Response, next: NextFunction) {
    try {
        const date = request.query.date as string;
        const count = request.query.count as unknown as number;
        if(!date) {
            throw new HttpException(400, 'Date parameter is missing.');
        }
        if(!count) {
            throw new HttpException(400, 'Count parameter is missing.');
        }
        if(!moment(date).isValid()) {
            throw new HttpException(400, 'Date parameter is invalid.');
        }
        if(isNaN(count)) {
            throw new HttpException(400, 'Count parameter is not a number.');
        }
        next();
    } catch (e) {
        next(e);
    }
}
