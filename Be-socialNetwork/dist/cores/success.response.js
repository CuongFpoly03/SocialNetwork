"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedResponse = exports.OKResponse = exports.SuccessResponse = void 0;
const constants_1 = require("../constants");
class SuccessResponse {
    constructor({ message = '', status = constants_1.StatusCode.OK, reasonStatusCode = constants_1.ReasonStatusCode.OK, metadata = {}, }) {
        this.message = message || reasonStatusCode;
        this.status = status;
        this.metadata = metadata;
        this.reasonStatusCode = reasonStatusCode;
    }
    send(res, headers = {}) {
        res.status(this.status).json(this);
    }
}
exports.SuccessResponse = SuccessResponse;
class OKResponse extends SuccessResponse {
    constructor(message, metadata = {}) {
        super({ message, metadata });
    }
}
exports.OKResponse = OKResponse;
class CreatedResponse extends SuccessResponse {
    constructor({ options = {}, message = '', status = constants_1.StatusCode.CREATED, reasonStatusCode = constants_1.ReasonStatusCode.CREATED, metadata = {}, }) {
        super({ message, status, reasonStatusCode, metadata });
        this.options = options;
    }
}
exports.CreatedResponse = CreatedResponse;
