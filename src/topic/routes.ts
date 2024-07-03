import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { topicController as controller } from './index.js';
import { validateJwt } from '../app/middlewares/VerifyJwtToken.js';
import TopicRequestSchema from './adapter/controller/schemas/TopicRequestSchema.js';

async function topicRoutes(fastify: FastifyInstance) {
  fastify.get('/', { preHandler: [validateJwt] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await controller.findAll(request, reply);
    reply.send(res);
  });

  fastify.post(
    '/',
    { schema: TopicRequestSchema, preHandler: [validateJwt] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const res = await controller.create(request, reply);
      reply.send(res);
    }
  );

  fastify.put(
    '/:id',
    { schema: TopicRequestSchema, preHandler: [validateJwt] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const res = await controller.update(request, reply);
      reply.send(res);
    }
  );

  fastify.delete('/:id', { preHandler: [validateJwt] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await controller.delete(request, reply);
    reply.send(res);
  });
}

export { topicRoutes };
