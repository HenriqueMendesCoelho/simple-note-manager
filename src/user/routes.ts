import UserRequestSchema from './adapter/controller/schemas/UserRequestSchema';
import { userController } from '.';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await userController.findById(request, reply);
    reply.send(res);
  });

  fastify.post('/', { schema: UserRequestSchema }, async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await userController.create(request, reply);
    reply.send(res);
  });
}

export { userRoutes };
