"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRequiredProps = void 0;
const httpException_1 = require("../../exceptions/httpException");
const currency_model_1 = require("../../models/currency.model");
class ValidateRequiredProps {
    static validate(request) {
        const inputtedCurrency = request.body;
        const currencyEntries = Object.entries(currency_model_1.currencyAsObject);
        for (const entry of currencyEntries) {
            if (!inputtedCurrency[entry[0]]) {
                throw new httpException_1.HttpException(400, `Property ${entry[0]} is missing!`);
            }
            if (typeof inputtedCurrency[entry[0]] !== entry[1]) {
                throw new httpException_1.HttpException(400, `Property ${entry[0]} should be of type ${entry[1]}!`);
            }
        }
    }
}
exports.ValidateRequiredProps = ValidateRequiredProps;
//# sourceMappingURL=validateRequiredProps.js.map