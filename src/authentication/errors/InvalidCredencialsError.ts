import { CustomError } from '../../app/errors/CustomError.js';

export class InvalidCredencialsError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Invalid Credencials');
    Object.setPrototypeOf(this, InvalidCredencialsError.prototype);
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
