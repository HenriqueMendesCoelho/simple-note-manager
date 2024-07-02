import { CustomError } from '../../app/errors/CustomError.js';

export class DuplicateTopicError extends CustomError {
  statusCode = 409;

  constructor() {
    super('Topic name already exists');
    Object.setPrototypeOf(this, DuplicateTopicError.prototype);
  }
  serializeErrors() {
    return {
      sucess: false,
      status_code: this.statusCode,
      description: 'Topic name already exists',
      timestamp: Date.now(),
    };
  }
}
