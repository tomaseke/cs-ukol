"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
function errorHandlerMiddleware(error, request, response, next) {
    const message = error.message || 'Something went wrong';
    const status = error.status || 500;
    const payload = {
        error: { message }
    };
    console.info(error);
    response.status(status).json(payload).send();
}
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//# sourceMappingURL=errorHandler.middleware.js.map