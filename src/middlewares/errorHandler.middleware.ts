import {HttpException} from "../exceptions/HttpException";
import express, {NextFunction} from "express";


export function errorHandlerMiddleware(error: any, request: express.Request, response: express.Response, next: NextFunction) {
    const message = error.message || 'Something went wrong';
    if (error instanceof HttpException) {
        const status = error?.status;

        let payload = {
            error: {
                message: message
            }
        }

        if(status !== 401) {
            console.info(error);
        }

        response.status(status).json(payload).send();
    } else {
        let payload = {
            error: {
                message: message
            }
        }

        console.info(error);
        response.status(500).json(payload).send();
    }

}
