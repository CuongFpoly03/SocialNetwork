import { NextFunction, Request, Response } from "express";
import { ApiError } from "../cores/error.response";

class ExceptionHandler {
    public handleError(error: Error, req: Request, res: Response, next: NextFunction): void {
        console.error(error.stack);
        if (error instanceof ApiError) {
            this.handleApiError(error, res);
            return;
        }
        this.handleGenericError(error, res);
    }

    private handleApiError(error: ApiError, res: Response): void {
        res.status(error.status).json({
            status: 'error',
            stack: error.stack,
            code: error.status,
            message: error.message,
        });
    }

    private handleGenericError(error: Error, res: Response): void {
        res.status(500).json({
            status: 'error',
            code: 500,
            stack: error.stack,
            message: 'Internal Server Error',
        });
    }
}
export const exceptionHandler = new ExceptionHandler()