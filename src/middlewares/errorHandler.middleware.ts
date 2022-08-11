import express, {NextFunction} from "express";

export function errorHandlerMiddleware(error: any, request: express.Request, response: express.Response, next: NextFunction) {
    const message = error.message || 'Something went wrong';
    const status = error.status || 500;
    const payload = {
        error: {message}
    };
    console.info(error);
    response.status(status).json(payload).send();
}
