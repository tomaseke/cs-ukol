import express from "express";
import {HttpException} from "../../exceptions/httpException";
import {currencyAsObject} from "../../models/currency.model";

export class ValidateAllowedProps{

    static validate(request: express.Request) {
        const inputtedCurrency = Object.keys(request.body);
        const currencyProps = Object.keys(currencyAsObject);
        for (const entry of inputtedCurrency) {
            if(!currencyProps.includes(entry)) {
                throw new HttpException(400, `Property ${entry} is not allowed!`)
            }
        }
    }

}
