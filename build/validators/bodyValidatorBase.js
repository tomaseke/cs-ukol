"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyValidatorBase = void 0;
const validateRequiredProps_1 = require("./bodyValidators/validateRequiredProps");
const validateAllowedProps_1 = require("./bodyValidators/validateAllowedProps");
const validateShortName_1 = require("./bodyValidators/validateShortName");
class BodyValidatorBase {
    constructor(request) {
        this.request = request;
        // ADD NEW VALIDATOR HERE
        // such validator has to have a method called 'validate' which accepts request as an argument
        this.validators = [validateRequiredProps_1.ValidateRequiredProps, validateAllowedProps_1.ValidateAllowedProps, validateShortName_1.ValidateShortName];
    }
    validate() {
        for (const validator of this.validators) {
            validator.validate(this.request);
        }
    }
}
exports.BodyValidatorBase = BodyValidatorBase;
//# sourceMappingURL=bodyValidatorBase.js.map