import { FastifyReply, FastifyRequest } from 'fastify';
import { CustomError } from '../../../app/errors/CustomError.js';

import { Topic } from '../../domain/Topic.js';
import { CreateTopicUseCase } from '../../usecases/CreateTopicUseCase.js';
import { FindTopicUseCase } from '../../usecases/FindTopicUseCase.js';
import { UpdateTopicUseCase } from '../../usecases/UpdateTopicUseCase.js';
import { DeleteTopicUseCase } from '../../usecases/DeleteTopicUseCase.js';

import { TopicNote } from '../../domain/TopicNote.js';
import { CreateTopicNoteUseCase } from '../../usecases/CreateTopicNoteUseCase.js';
import { FindTopicNoteUseCase } from '../../usecases/FindTopicNoteUseCase.js';
import { UpdateTopicNoteUseCase } from '../../usecases/UpdateTopicNoteUseCase.js';
import { DeleteTopicNoteUseCase } from '../../usecases/DeleteTopicNoteUseCase.js';

export default class TopicController {
  constructor(
    private createTopicUseCase: CreateTopicUseCase,
    private findTopicUseCase: FindTopicUseCase,
    private updateTopicUseCase: UpdateTopicUseCase,
    private deleteTopicUseCase: DeleteTopicUseCase,

    private createTopicNoteUseCase: CreateTopicNoteUseCase,
    private findTopicNoteUseCase: FindTopicNoteUseCase,
    private updateTopicNoteUseCase: UpdateTopicNoteUseCase,
    private deleteTopicNoteUseCase: DeleteTopicNoteUseCase
  ) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { title, description } = request.body as Topic;

    try {
      const topic = await this.createTopicUseCase.execute({ title, description });
      reply.status(201).send(topic);
    } catch (error) {
      if (error instanceof CustomError) {
        reply.status(error.statusCode).send(error.serializeErrors());
      }
      reply.status(500).send({ message: 'Internal server error' });
    }
  }
  async findAll(request: FastifyRequest, reply: FastifyReply) {
    const topics = await this.findTopicUseCase.findAll();
    if (!topics?.length) {
      reply.status(204).send();
      return;
    }

    reply.send(topics);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { title, description } = request.body as Topic;
    const { id } = request.params as { id: string };

    try {
      const topic = await this.updateTopicUseCase.execute(id, { title, description });
      reply.send(topic);
    } catch (error) {
      if (error instanceof CustomError) {
        reply.status(error.statusCode).send(error.serializeErrors());
      }
      reply.status(500).send({ message: 'Internal server error' });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    await this.deleteTopicUseCase.execute(id);
    reply.status(204).send();
  }

  async createNote(request: FastifyRequest, reply: FastifyReply) {
    const { topicId } = request.params as { topicId: string };
    const { title, description } = request.body as TopicNote;

    try {
      const topic = await this.createTopicNoteUseCase.execute(topicId, { title, description });
      reply.status(201).send(topic);
    } catch (error) {
      if (error instanceof CustomError) {
        reply.status(error.statusCode).send(error.serializeErrors());
      }
      reply.status(500).send({ message: 'Internal server error' });
    }
  }

  async findAllNotes(request: FastifyRequest, reply: FastifyReply) {
    const { topicId } = request.params as { topicId: string };
    const topics = await this.findTopicNoteUseCase.findAll(topicId);
    if (!topics?.length) {
      reply.status(204).send();
      return;
    }

    reply.send(topics);
  }

  async updateNote(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { title, description } = request.body as TopicNote;

    try {
      const topic = await this.updateTopicNoteUseCase.execute(id, { title, description });
      reply.send(topic);
    } catch (error) {
      if (error instanceof CustomError) {
        reply.status(error.statusCode).send(error.serializeErrors());
      }
      reply.status(500).send({ message: 'Internal server error' });
    }
  }

  async deleteNote(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    await this.deleteTopicNoteUseCase.execute(id);
    reply.status(204).send();
  }
}
