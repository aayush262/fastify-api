const fastify = require('fastify');
const db = require('../plugin/database');
const testRoutes = require('./../routes/tempTestRoute');

const build = (options = {}) => {
  const app = fastify(options);

  //connecting my database
  app.register(db);

  //registering routes
  app.register(testRoutes, {
    prefix: '/api/v1/test',
  });

  app.get('/', (request, reply) => {
    reply.code(200).send({
      FirstMessage: 'Hello from fastify server',
    });
  });

  return app;
};

module.exports = build;
