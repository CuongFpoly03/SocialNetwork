"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNullObject = exports.asyncHandler = void 0;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
const deleteNullObject = (object) => {
    Object.keys(object).forEach((key) => {
        if (object[key] === null || object[key] === undefined) {
            delete object[key];
        }
    });
    return object;
};
exports.deleteNullObject = deleteNullObject;
