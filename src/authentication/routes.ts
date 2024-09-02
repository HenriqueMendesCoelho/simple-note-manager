import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { authenticationController as controller } from './index.js';
import LoginRequestSchema from './adapter/controller/schemas/LoginRequestSchema.js';

async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', { schema: LoginRequestSchema }, async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await controller.login(request, reply);
    reply.send(res);
  });
}

export { authRoutes };
