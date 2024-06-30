import { FastifyRequest, FastifyReply } from 'fastify';
import * as changeKeys from 'change-case/keys';
import { Login } from '../../domain/Login.js';
import LoginUseCase from '../../usecases/login/LoginUseCase.js';
import { CustomError } from '../../../app/errors/CustomError.js';

export default class AuthenticationController {
  constructor(private loginUseCase: LoginUseCase) {}
  async login(request: FastifyRequest, reply: FastifyReply) {
    const body = changeKeys.camelCase(request.body) as Login;

    try {
      const response = changeKeys.snakeCase(await this.loginUseCase.execute(body));
      reply.send(response);
    } catch (error) {
      if (error instanceof CustomError) {
        return reply.code(error.statusCode).send(error.serializeErrors());
      }

      return reply.code(500).send(error);
    }
  }
}
