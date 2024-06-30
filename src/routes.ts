import { FastifyInstance } from 'fastify';
import { userRoutes } from './user/routes';

const API_PREFIX = '/api';

async function routes(fastify: FastifyInstance) {
  fastify.register(userRoutes, { prefix: `${API_PREFIX}/user` });
}

export default routes;
