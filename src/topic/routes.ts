import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { topicController as controller } from './index.js';
import { validateJwt } from '../app/middlewares/VerifyJwtToken.js';
import TopicRequestSchema from './adapter/controller/schemas/TopicRequestSchema.js';

async function topicRoutes(fastify: FastifyInstance) {
  fastify.post('/', { schema: TopicRequestSchema, preHandler: [validateJwt] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await controller.create(request, reply);
    reply.send(res);
  });

  fastify.get('/', { preHandler: [validateJwt] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await controller.findAll(request, reply);
    reply.send(res);
  });

  fastify.get('/:id', { preHandler: [validateJwt] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await controller.findById(request, reply);
    reply.send(res);
  });

  fastify.put('/:id', { schema: TopicRequestSchema, preHandler: [validateJwt] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await controller.update(request, reply);
    reply.send(res);
  });

  fastify.delete('/:id', { preHandler: [validateJwt] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await controller.delete(request, reply);
    reply.send(res);
  });

  //Topic Notes
  fastify.post('/:topicId/notes', { schema: TopicRequestSchema, preHandler: [validateJwt] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await controller.createNote(request, reply);
    reply.send(res);
  });

  fastify.get('/:topicId/notes', { preHandler: [validateJwt] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await controller.findAllNotes(request, reply);
    reply.send(res);
  });

  fastify.put('/notes/:id', { schema: TopicRequestSchema, preHandler: [validateJwt] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await controller.updateNote(request, reply);
    reply.send(res);
  });

  fastify.delete('/notes/:id', { preHandler: [validateJwt] }, async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await controller.deleteNote(request, reply);
    reply.send(res);
  });
}

export { topicRoutes };
