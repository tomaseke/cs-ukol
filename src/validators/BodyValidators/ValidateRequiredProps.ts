import express from "express";
import {HttpException} from "../../exceptions/httpException";
import {currencyAsObject} from "../../models/currency.model";

export class ValidateRequiredProps{

    static validate(request: express.Request) {
        const inputtedCurrency = request.body;
        console.log(inputtedCurrency)
        const currencyEntries = Object.entries(currencyAsObject);
        for (const entry of currencyEntries) {
            if(!inputtedCurrency[entry[0]]) {
                throw new HttpException(400, `Property ${entry[0]} is missing!`)
            }
            if(typeof inputtedCurrency[entry[0]] !== entry[1]) {
                throw new HttpException(400, `Property ${entry[0]} should be of type ${entry[1]}!`)
            }
        }
    }

}
