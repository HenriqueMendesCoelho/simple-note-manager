import { CustomError } from '../../app/errors/CustomError.js';

export class InvalidCredencialsError extends CustomError {
  statusCode = 401;
  private description: string;

  constructor(message = 'Invalid Credencials') {
    super(message);
    this.description = message;
    Object.setPrototypeOf(this, InvalidCredencialsError.prototype);
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
