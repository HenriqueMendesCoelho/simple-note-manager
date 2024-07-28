import { CustomError } from '../../app/errors/CustomError.js';

export class DuplicateUsernameError extends CustomError {
  statusCode = 409;
  private description: string;

  constructor(message = 'Username already exists') {
    super(message);
    this.description = message;
    Object.setPrototypeOf(this, DuplicateUsernameError.prototype);
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
