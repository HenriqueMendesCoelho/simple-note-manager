import { CustomError } from '../../../app/errors/CustomError.js';
import { Topic } from '../../domain/Topic.js';
import { CreateTopicUseCase } from '../../usecases/CreateTopicUseCase.js';
import { DeleteTopicUseCase } from '../../usecases/DeleteTopicUseCase.js';
import { FindTopicUseCase } from '../../usecases/FindTopicUseCase.js';
import { UpdateTopicUseCase } from '../../usecases/UpdateTopicUseCase.js';
import { camelCase, snakeCase } from 'change-case/keys';
import { FastifyReply, FastifyRequest } from 'fastify';

export default class TopicController {
  constructor(
    private findTopicUseCase: FindTopicUseCase,
    private createTopicUseCase: CreateTopicUseCase,
    private updateTopicUseCase: UpdateTopicUseCase,
    private deleteTopicUseCase: DeleteTopicUseCase
  ) {}

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    const topics = await this.findTopicUseCase.findAll();
    if (!topics?.length) {
      reply.status(204).send();
      return;
    }

    reply.send(topics);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const body = camelCase(request.body) as Topic;

    try {
      const topic = snakeCase(await this.createTopicUseCase.execute(body));
      reply.status(201).send(topic);
    } catch (error) {
      if (error instanceof CustomError) {
        reply.status(error.statusCode).send(snakeCase(error.serializeErrors()));
      }
      reply.status(500).send({ message: 'Internal server error' });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const body = camelCase(request.body) as Topic;
    const { id } = request.params as { id: string };

    try {
      const topic = snakeCase(await this.updateTopicUseCase.execute(id, body));
      reply.send(topic);
    } catch (error) {
      if (error instanceof CustomError) {
        reply.status(error.statusCode).send(snakeCase(error.serializeErrors()));
      }
      reply.status(500).send({ message: 'Internal server error' });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    await this.deleteTopicUseCase.execute(id);
    reply.status(204).send();
  }
}
