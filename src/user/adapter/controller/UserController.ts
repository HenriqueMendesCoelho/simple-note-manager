import { FastifyReply, FastifyRequest } from 'fastify';
import { User } from '../../domain/User.js';
import CreateUserUseCase from '../../usecases/create-user/CreateUserUseCase.js';
import FindUserUseCase from '../../usecases/find-user/FindUserUseCase.js';
import { camelCase, snakeCase } from 'change-case/keys';
import { CustomError } from '../../../app/errors/CustomError.js';

export default class UserController {
  constructor(private createUserUseCase: CreateUserUseCase, private findUserUseCase: FindUserUseCase) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const body = camelCase(request.body) as User;

    try {
      const user = snakeCase(await this.createUserUseCase.execute(body));

      reply.send(user);
    } catch (error) {
      if (error instanceof CustomError) {
        reply.status(error.statusCode).send(snakeCase(error.serializeErrors()));
      }

      reply.status(500).send({ message: 'Internal server error' });
    }
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const user = snakeCase(await this.findUserUseCase.findById(id));
      if (!user) {
        reply.status(404).send({ message: 'User not found' });
        return;
      }

      reply.send(user);
    } catch (error) {
      if (error instanceof CustomError) {
        reply.status(error.statusCode).send(snakeCase(error.serializeErrors()));
      }

      reply.status(500).send({ message: 'Internal server error' });
    }
  }
}
