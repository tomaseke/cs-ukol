import express from "express";
import {ValidateLimit} from "./Validators/ValidateLimit";
import {ValidateOlderThanDate} from "./Validators/ValidateOlderThanDate";
import {ValidateNewerThanDate} from "./Validators/ValidateNewerThanDate";
import {ValidateOrder} from "./Validators/ValidateOrder";

export class QueryValidatorBase {

    // ADD NEW VALIDATOR HERE
    // such validator has to have a method called 'validate' which accepts request as an argument
    private validators = [ValidateLimit, ValidateOlderThanDate, ValidateNewerThanDate, ValidateOrder];

    constructor(private request: express.Request) {
    }

    validate() {
        for (const validator of this.validators) {
            validator.validate(this.request);
        }
    }
}
