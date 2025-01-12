import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes, HookHandlerDoneFunction } from 'fastify';
import { camelCase, snakeCase } from 'change-case/keys';

export const camelCaseConverter = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
  const { body } = request;
  const newBody = camelCase(body, Number.MAX_SAFE_INTEGER);
  request.body = newBody;

  done();
};

export const snakeCaseConverter = (request: FastifyRequest, reply: FastifyReply, payload: unknown, done: DoneFuncWithErrOrRes) => {
  const err = null;
  const newPayload = snakeCase(payload, Number.MAX_SAFE_INTEGER);

  done(err, newPayload);
};
