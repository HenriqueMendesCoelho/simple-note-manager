import { CustomError } from '../../app/errors/CustomError.js';

export class UserNotFoundError extends CustomError {
  statusCode = 404;
  private description: string;

  constructor(message = 'User not found') {
    super(message);
    this.description = message;
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
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
