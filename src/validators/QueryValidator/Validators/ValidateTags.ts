import {transformQueryStringToArray} from "../../../helpers/helperFunctions";
import {HttpException} from "../../../exceptions/HttpException";
import express from "express";

export class ValidateTags {

    static validate(request: express.Request) {
        if(request?.query?.tags){
            const tags = transformQueryStringToArray(request.query.tags as string);
            const allTagsAreOnSpace = tags.every(tag => request['spaceData'].tags.includes(tag));
            if(!allTagsAreOnSpace){
                throw new HttpException(400, 'You are trying to get rules by tags that are not used on any rule.');
            }
        }
    }

}
