import {HttpException} from "../../../exceptions/HttpException";
import express from "express";
import {config} from "../../../config";

export class ValidateLimit{

    static validate(request: express.Request) {
        if (request?.query?.page_size) {
            const parsedLimit = Number(request.query.page_size);
            if (!parsedLimit) {
                throw new HttpException(400, 'Limit query parameter has to be a number.')
            }
            if(parsedLimit > config().auditPageSize){
                throw new HttpException(400, `Limit query parameter has to be less than ${config().auditPageSize}.`)
            }
        }
    }

}
