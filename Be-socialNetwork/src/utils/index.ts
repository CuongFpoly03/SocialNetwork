import { Request, Response, NextFunction } from "express";

export const asyncHandler = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};

export const deleteNullObject = (object: any) => {
    Object.keys(object).forEach((key) => {
        if (object[key] === null || object[key] === undefined) {
            delete object[key];
        }
    });
    return object;
}