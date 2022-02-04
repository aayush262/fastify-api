const fastify = require('fastify');
const db = require('../plugin/database');
const swaggerPg = require('../plugin/swagger');

const testRoutes = require('../routes/tempTestRoute');
const userRoutes = require('../routes/userRoute');

const build = (options = {}) => {
  const app = fastify(options);

  // connecting my database
  app.register(db);

  // connecting swagger for API documentation
  app.register(swaggerPg);

  // registering routes
  app.register(testRoutes, {
    prefix: '/api/v1/test',
  });

  app.register(userRoutes, {
    prefix: '/api/v1/users',
  });

  app.get('/', (request, reply) => {
    reply.code(200).send({
      FirstMessage: 'Hello from fastify server',
    });
  });

  return app;
};

module.exports = build;
