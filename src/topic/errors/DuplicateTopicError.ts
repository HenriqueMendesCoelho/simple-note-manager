import { CustomError } from '../../app/errors/CustomError.js';

export class DuplicateTopicError extends CustomError {
  statusCode = 409;
  description: string;

  constructor(message = 'Topic name already exists') {
    super(message);
    this.description = message;
    Object.setPrototypeOf(this, DuplicateTopicError.prototype);
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
