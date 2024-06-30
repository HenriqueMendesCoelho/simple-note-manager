import { FastifyInstance } from 'fastify';
import { userRoutes } from './user/routes.js';
import { authRoutes } from './authentication/routes.js';

const API_PREFIX = '/api';

async function routes(fastify: FastifyInstance) {
  fastify.register(userRoutes, { prefix: `${API_PREFIX}/user` });
  fastify.register(authRoutes, { prefix: `${API_PREFIX}` });
}

export default routes;
