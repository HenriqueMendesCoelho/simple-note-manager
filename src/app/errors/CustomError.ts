export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(description: string) {
    super(description);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    sucess: boolean;
    status_code: number;
    description: string;
    field?: string;
  };
}
