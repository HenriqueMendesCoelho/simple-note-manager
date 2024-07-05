import { CustomError } from '../../app/errors/CustomError.js';

export class DuplicateTopicNoteError extends CustomError {
  statusCode = 409;
  description: string;

  constructor(message = 'Topic Note title already exists for this topic') {
    super(message);
    this.description = message;
    Object.setPrototypeOf(this, DuplicateTopicNoteError.prototype);
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
