"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionHandler = void 0;
const error_response_1 = require("../cores/error.response");
class ExceptionHandler {
    handleError(error, req, res, next) {
        console.error(error.stack);
        if (error instanceof error_response_1.ApiError) {
            this.handleApiError(error, res);
            return;
        }
        this.handleGenericError(error, res);
    }
    handleApiError(error, res) {
        res.status(error.status).json({
            status: 'error',
            stack: error.stack,
            code: error.status,
            message: error.message,
        });
    }
    handleGenericError(error, res) {
        res.status(500).json({
            status: 'error',
            code: 500,
            stack: error.stack,
            message: 'Internal Server Error',
        });
    }
}
exports.exceptionHandler = new ExceptionHandler();
