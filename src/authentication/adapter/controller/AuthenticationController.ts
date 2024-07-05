import { FastifyRequest, FastifyReply } from 'fastify';
import { Login } from '../../domain/Login.js';
import LoginUseCase from '../../usecases/login/LoginUseCase.js';
import { CustomError } from '../../../app/errors/CustomError.js';

export default class AuthenticationController {
  constructor(private loginUseCase: LoginUseCase) {}
  async login(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as Login;

    try {
      const response = await this.loginUseCase.execute(body);
      reply.send(response);
    } catch (error) {
      if (error instanceof CustomError) {
        return reply.code(error.statusCode).send(error.serializeErrors());
      }

      return reply.code(500).send(error);
    }
  }
}
