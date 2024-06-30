import { CustomError } from '../../app/errors/CustomError.js';

export class DuplicateUsernameError extends CustomError {
  statusCode = 409;

  constructor() {
    super('Username already exists');
    Object.setPrototypeOf(this, DuplicateUsernameError.prototype);
  }
  serializeErrors() {
    return {
      sucess: false,
      status_code: this.statusCode,
      description: 'Invalid Credencials',
      timestamp: Date.now(),
    };
  }
}
