import {HttpException} from "../../../exceptions/HttpException";
import express from "express";
import {config} from "../../../config";

export class ValidateOrder{

    static validate(request: express.Request) {
        if (request?.query?.order) {
            const parsedOrder = String(request.query.order);
            const allowedValues = ['asc','desc'];
            if (!parsedOrder) {
                throw new HttpException(400, 'Order query parameter has to be a string.')
            }
            if(!allowedValues.includes(parsedOrder)){
                throw new HttpException(400, `Order query parameter needs to have on of the following values: ${allowedValues.map(val=>`'${val}'`).join(', ')}.`)
            }
        }
    }

}
