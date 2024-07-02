import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { userController as controller } from './index.js';
import UserRequestSchema from './adapter/controller/schemas/UserRequestSchema.js';
import { validateJwt, validateJwtAdmin } from '../app/hooks/VerifyJwtToken.js';

async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/:id', { preHandler: [validateJwt] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await controller.findById(request, reply);
    reply.send(res);
  });

  fastify.post(
    '/',
    { schema: UserRequestSchema, preHandler: [validateJwtAdmin] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const res = await controller.create(request, reply);
      reply.send(res);
    }
  );
}

export { userRoutes };
