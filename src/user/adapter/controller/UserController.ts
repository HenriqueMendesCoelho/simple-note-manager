import { FastifyReply, FastifyRequest } from 'fastify';
import { User } from '../../domain/User.js';
import { CustomError } from '../../../app/errors/CustomError.js';
import CreateUserUseCase from '../../usecases/CreateUserUseCase.js';
import FindUserUseCase from '../../usecases/FindUserUseCase.js';

export default class UserController {
  constructor(private createUserUseCase: CreateUserUseCase, private findUserUseCase: FindUserUseCase) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const { username, password } = request.body as User;

    try {
      const user = await this.createUserUseCase.execute({ username, password });

      reply.send(user);
    } catch (error) {
      if (error instanceof CustomError) {
        reply.status(error.statusCode).send(error.serializeErrors());
      }

      reply.status(500).send({ message: 'Internal server error' });
    }
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const user = await this.findUserUseCase.findById(id);
      if (!user) {
        reply.status(404).send({ message: 'User not found' });
        return;
      }

      reply.send(user);
    } catch (error) {
      if (error instanceof CustomError) {
        reply.status(error.statusCode).send(error.serializeErrors());
      }

      reply.status(500).send({ message: 'Internal server error' });
    }
  }
}
