import { CustomError } from '../../app/errors/CustomError.js';

export class InvalidTokenError extends CustomError {
  statusCode = 403;
  private description: string;

  constructor(message = 'Invalid token') {
    super(message);
    this.description = message;
    Object.setPrototypeOf(this, InvalidTokenError.prototype);
  }
  serializeErrors() {
    return {
      sucess: false,
      status_code: this.statusCode,
      description: this.description,
      timestamp: Date.now(),
    };
  }
}
