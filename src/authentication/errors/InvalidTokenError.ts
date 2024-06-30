import { CustomError } from '../../app/errors/CustomError.js';

export class InvalidTokenError extends CustomError {
  statusCode = 403;

  constructor() {
    super('Invalid token');
    Object.setPrototypeOf(this, InvalidTokenError.prototype);
  }
  serializeErrors() {
    return {
      sucess: false,
      status_code: this.statusCode,
      description: 'Invalid token',
      timestamp: Date.now(),
    };
  }
}
