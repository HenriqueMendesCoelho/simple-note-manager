import CreateUserUseCase from '../../usecases/create-user/CreateUserUseCase';
import { User } from '../../domain/user';
import FindUserUseCase from '../../usecases/find-user/FindUserUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';

export default class UserController {
  constructor(private createUserUseCase: CreateUserUseCase, private findUserUseCase: FindUserUseCase) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as User;
    const user = await this.createUserUseCase.execute(body);

    reply.send(user);
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const user = await this.findUserUseCase.findById(id);
    if (!user) {
      reply.status(404).send({ message: 'User not found' });
      return;
    }

    reply.send(user);
  }
}
