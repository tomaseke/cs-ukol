"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQueryMiddleware = void 0;
const httpException_1 = require("../exceptions/httpException");
const moment_1 = __importDefault(require("moment"));
function validateQueryMiddleware(request, response, next) {
    try {
        const date = request.query.date;
        const count = request.query.count;
        if (!date) {
            throw new httpException_1.HttpException(400, 'Date parameter is missing.');
        }
        if (!count) {
            throw new httpException_1.HttpException(400, 'Count parameter is missing.');
        }
        if (!(0, moment_1.default)(date).isValid()) {
            throw new httpException_1.HttpException(400, 'Date parameter is invalid.');
        }
        if (isNaN(count)) {
            throw new httpException_1.HttpException(400, 'Count parameter is not a number.');
        }
        next();
    }
    catch (e) {
        next(e);
    }
}
exports.validateQueryMiddleware = validateQueryMiddleware;
//# sourceMappingURL=validateQuery.middleware.js.map