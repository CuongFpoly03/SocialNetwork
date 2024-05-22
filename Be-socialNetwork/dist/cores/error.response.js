"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceNotFoundError = exports.InternalServerError = exports.UnauthorizedError = exports.ForbiddenError = exports.BadRequestError = exports.ConflictError = exports.ApiError = void 0;
const constants_1 = require("../constants");
class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.message = message;
        this.status = status;
    }
}
exports.ApiError = ApiError;
class ConflictError extends ApiError {
    constructor(message) {
        super(message || constants_1.ReasonStatusCode.CONFLICT, constants_1.StatusCode.CONFLICT);
    }
}
exports.ConflictError = ConflictError;
class BadRequestError extends ApiError {
    constructor(message) {
        super(message || constants_1.ReasonStatusCode.BAD_REQUEST, constants_1.StatusCode.BAD_REQUEST);
    }
}
exports.BadRequestError = BadRequestError;
class ForbiddenError extends ApiError {
    constructor(message) {
        super(message || constants_1.ReasonStatusCode.FORBIDDEN, constants_1.StatusCode.FORBIDDEN);
    }
}
exports.ForbiddenError = ForbiddenError;
class UnauthorizedError extends ApiError {
    constructor(message) {
        super(message || constants_1.ReasonStatusCode.UNAUTHORIZED, constants_1.StatusCode.UNAUTHORIZED);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class InternalServerError extends ApiError {
    constructor(message) {
        super(message || constants_1.ReasonStatusCode.INTERNAL_SERVER_ERROR, constants_1.StatusCode.INTERNAL_SERVER_ERROR);
    }
}
exports.InternalServerError = InternalServerError;
class ResourceNotFoundError extends ApiError {
    constructor(message) {
        super(message || constants_1.ReasonStatusCode.NOT_FOUND, constants_1.StatusCode.NOT_FOUND);
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
