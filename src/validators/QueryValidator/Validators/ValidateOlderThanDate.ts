import {HttpException} from "../../../exceptions/HttpException";
import moment from "moment";
import express from "express";

export class ValidateOlderThanDate {

    static validate(request: express.Request) {
        if(request?.query?.date_lte){
           const isValidDate = moment(request.query.date_lte as string).isValid();
           if(!isValidDate) {
               throw new HttpException(400, 'Older than date that you have inputted is invalid. Please enter a valid date.')
           }
        }
    }

}
