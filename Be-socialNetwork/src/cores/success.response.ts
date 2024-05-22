import { ReasonStatusCode, StatusCode } from "../constants";

export  class SuccessResponse {
  public readonly message: string;
  public readonly status: StatusCode;
  public readonly metadata: object | null;
  public readonly reasonStatusCode: string;

  constructor({
    message = '',
    status = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {},
  }: {
    message?: string;
    status?: StatusCode;
    reasonStatusCode?: string;
    metadata?: {};
  }) {
    this.message = message || reasonStatusCode;
    this.status = status;
    this.metadata = metadata;
    this.reasonStatusCode = reasonStatusCode;
  }

  public send(res: any, headers = {}): void {
    res.status(this.status).json(this);
  }
}

export class OKResponse extends SuccessResponse {
  constructor(message: string, metadata: object = {}) {
    super({ message, metadata });
  }
}

export class CreatedResponse extends SuccessResponse {
  public readonly options: object;
  constructor({
    options = {},
    message = '',
    status = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metadata = {},
  }: {
    options?: object;
    message?: string;
    status?: StatusCode;
    reasonStatusCode?: string;
    metadata?: object;
  }) {
    super({ message, status, reasonStatusCode, metadata });
    this.options = options;
  }
}


