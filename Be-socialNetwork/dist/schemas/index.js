"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const error_response_1 = require("../cores/error.response");
const validate = (schema, objectValidate) => {
    const { error } = schema.validate(objectValidate, { abortEarly: false });
    if (error) {
        const errors = error.details.map((item) => item.message);
        throw new error_response_1.ConflictError(errors);
    }
    return true;
};
exports.validate = validate;
