import { FastifyInstance } from 'fastify';
import { userRoutes } from './user/routes.js';
import { authRoutes } from './authentication/routes.js';
import { topicRoutes } from './topic/routes.js';

const API_PREFIX = '/api';

async function routes(fastify: FastifyInstance) {
  fastify.register(userRoutes, { prefix: `${API_PREFIX}/users` });
  fastify.register(authRoutes, { prefix: `${API_PREFIX}` });
  fastify.register(topicRoutes, { prefix: `${API_PREFIX}/topics` });
}

export default routes;
