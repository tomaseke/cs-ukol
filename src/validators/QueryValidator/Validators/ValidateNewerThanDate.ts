import {HttpException} from "../../../exceptions/HttpException";
import moment from "moment";
import express from "express";

export class ValidateNewerThanDate {

    static validate(request: express.Request) {
        if (request?.query?.date_gte) {
            const isValidDate = moment(request.query.date_gte as string).isValid();
            if (!isValidDate) {
                throw new HttpException(400, 'Newer than date that you have inputted is invalid. Please enter a valid date.')
            }
        }
    }

}
