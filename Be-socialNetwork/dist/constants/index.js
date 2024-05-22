"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReasonStatusCode = exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCode[StatusCode["CONFLICT"] = 409] = "CONFLICT";
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCode[StatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
    StatusCode[StatusCode["OK"] = 200] = "OK";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
var ReasonStatusCode;
(function (ReasonStatusCode) {
    ReasonStatusCode["FORBIDDEN"] = "Invalid Request Error";
    ReasonStatusCode["CONFLICT"] = "Conflict Error";
    ReasonStatusCode["BAD_REQUEST"] = "Validation Error";
    ReasonStatusCode["NOT_FOUND"] = "Not Found";
    ReasonStatusCode["UNAUTHORIZED"] = "Unauthorized Access";
    ReasonStatusCode["INTERNAL_SERVER_ERROR"] = "Internal Server Error";
    ReasonStatusCode["CREATED"] = "Created";
    ReasonStatusCode["OK"] = "Success";
})(ReasonStatusCode || (exports.ReasonStatusCode = ReasonStatusCode = {}));
