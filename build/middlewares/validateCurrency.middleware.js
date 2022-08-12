"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCurrencyMiddleware = void 0;
const bodyValidatorBase_1 = require("../validators/bodyValidatorBase");
function validateCurrencyMiddleware(request, response, next) {
    try {
        const validator = new bodyValidatorBase_1.BodyValidatorBase(request);
        validator.validate();
        next();
    }
    catch (e) {
        next(e);
    }
}
exports.validateCurrencyMiddleware = validateCurrencyMiddleware;
//# sourceMappingURL=validateCurrency.middleware.js.map