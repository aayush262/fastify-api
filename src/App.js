const fastify = require('fastify');

const build = (options = {}) => {
  const app = fastify(options);

  app.get('/', (request, reply) => {
    reply.code(200).send({
      FirstMessage: 'Hello from fastify server',
    });
  });

  return app;
};

module.exports = build;
