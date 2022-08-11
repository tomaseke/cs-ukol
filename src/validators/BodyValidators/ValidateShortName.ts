import express from "express";
import {HttpException} from "../../exceptions/HttpException";

export class ValidateShortName{

    static validate(request: express.Request) {
        if(request?.body?.shortName?.length !== 3) {
            throw new HttpException(400, 'Short name of currency has to have exactly 3 letters.');
        }
    }

}
