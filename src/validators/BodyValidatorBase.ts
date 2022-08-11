import express from "express";
import {ValidateRequiredProps} from "./BodyValidators/ValidateRequiredProps";
import {ValidateAllowedProps} from "./BodyValidators/ValidateAllowedProps";
import {ValidateShortName} from "./BodyValidators/ValidateShortName";

export class BodyValidatorBase {

    // ADD NEW VALIDATOR HERE
    // such validator has to have a method called 'validate' which accepts request as an argument
    private validators = [ValidateRequiredProps, ValidateAllowedProps, ValidateShortName];

    constructor(private request: express.Request) {
    }

    validate() {
        for (const validator of this.validators) {
            validator.validate(this.request);
        }
    }
}