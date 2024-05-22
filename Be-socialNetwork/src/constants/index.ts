export enum StatusCode {
    FORBIDDEN = 403,
    CONFLICT = 409,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    INTERNAL_SERVER_ERROR = 500,
    CREATED = 201,
    OK = 200,
}

export enum ReasonStatusCode {
    FORBIDDEN = "Invalid Request Error",
    CONFLICT = "Conflict Error",
    BAD_REQUEST = "Validation Error",
    NOT_FOUND = "Not Found",
    UNAUTHORIZED = "Unauthorized Access",
    INTERNAL_SERVER_ERROR = "Internal Server Error",
    CREATED = "Created",
    OK = "Success",
}

