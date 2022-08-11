import express from "express";
import {HttpException} from "../../exceptions/HttpException";
import {currencyAsObject} from "../../models/Currency";

export class ValidateRequiredProps{

    static validate(request: express.Request) {
        const inputtedCurrency = request.body;
        const currencyEntries = Object.entries(currencyAsObject);
        for (const entry of currencyEntries) {
            if(!inputtedCurrency[entry[0]]) {
                throw new HttpException(400, `Property ${entry[0]} is missing!`)
            }
            if(typeof inputtedCurrency[entry[0]] !== entry[1]) {
                throw new HttpException(400, `Property ${entry[0]} has incorrect type!`)
            }
        }
    }

}
