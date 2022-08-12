"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateAllowedProps = void 0;
const httpException_1 = require("../../exceptions/httpException");
const currency_model_1 = require("../../models/currency.model");
class ValidateAllowedProps {
    static validate(request) {
        const inputtedCurrency = Object.keys(request.body);
        const currencyProps = Object.keys(currency_model_1.currencyAsObject);
        for (const entry of inputtedCurrency) {
            if (!currencyProps.includes(entry)) {
                throw new httpException_1.HttpException(400, `Property ${entry} is not allowed!`);
            }
        }
    }
}
exports.ValidateAllowedProps = ValidateAllowedProps;
//# sourceMappingURL=validateAllowedProps.js.map