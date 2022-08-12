"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateShortName = void 0;
const httpException_1 = require("../../exceptions/httpException");
class ValidateShortName {
    static validate(request) {
        var _a, _b;
        if (((_b = (_a = request === null || request === void 0 ? void 0 : request.body) === null || _a === void 0 ? void 0 : _a.shortName) === null || _b === void 0 ? void 0 : _b.length) !== 3) {
            throw new httpException_1.HttpException(400, 'Short name of currency has to have exactly 3 letters.');
        }
    }
}
exports.ValidateShortName = ValidateShortName;
//# sourceMappingURL=validateShortName.js.map