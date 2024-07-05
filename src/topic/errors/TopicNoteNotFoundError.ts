import { CustomError } from '../../app/errors/CustomError.js';

export class TopicNoteNotFoundError extends CustomError {
  statusCode = 404;
  private description: string;

  constructor(message = 'Topic Note not found') {
    super(message);
    this.description = message;
    Object.setPrototypeOf(this, TopicNoteNotFoundError.prototype);
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
