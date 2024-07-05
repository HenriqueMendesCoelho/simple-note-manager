import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';

export const logger = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
  const { method, url } = request.raw;
  const { statusCode } = reply;
  const ip = request.ip;
  console.info(`[${statusCode}][${method}]${url}[from:${ip}]`);

  done();
};
