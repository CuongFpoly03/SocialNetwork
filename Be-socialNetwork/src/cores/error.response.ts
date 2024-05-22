import { ReasonStatusCode, StatusCode } from "../constants";

export class ApiError extends Error {
  public readonly message: string;
  public readonly status: number;

  constructor(message: string, status: StatusCode) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
export class ConflictError extends ApiError {
  constructor(message?: ReasonStatusCode | string) {
    super(message || ReasonStatusCode.CONFLICT, StatusCode.CONFLICT);
  }
}

export class BadRequestError extends ApiError {
  constructor(message?: ReasonStatusCode | string) {
    super(message || ReasonStatusCode.BAD_REQUEST, StatusCode.BAD_REQUEST);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message?: ReasonStatusCode | string) {
    super(message || ReasonStatusCode.FORBIDDEN, StatusCode.FORBIDDEN);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message?: ReasonStatusCode | string) {
    super(message || ReasonStatusCode.UNAUTHORIZED, StatusCode.UNAUTHORIZED);
  }
}

export class InternalServerError extends ApiError {
  constructor(message?: ReasonStatusCode | string) {
    super(message || ReasonStatusCode.INTERNAL_SERVER_ERROR, StatusCode.INTERNAL_SERVER_ERROR);
  }
}

export class ResourceNotFoundError extends ApiError {

  constructor(message?: ReasonStatusCode | string) {
    super(message || ReasonStatusCode.NOT_FOUND, StatusCode.NOT_FOUND);

  }
}

