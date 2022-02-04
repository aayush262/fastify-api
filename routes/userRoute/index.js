const UserService = require('../../src/services/user.service');
const {
  postRequestBody,
  postResponseBody,
  requestParams,
  getResponseBody,
} = require('./user.schema');

const userRoutes = async (fastify) => {
  const { createUser, getUserById } = UserService(fastify);

  fastify.get(
    '/:userId',
    {
      schema: {
        params: requestParams,
        response: getResponseBody,
      },
    },
    async (request, reply) => {
      try {
        const user = await getUserById(request.params.userId);
        reply.code(200).send(user);
      } catch (err) {
        reply.code(400).send(err);
      }
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: postRequestBody,
        response: postResponseBody,
      },
    },
    async (request, reply) => {
      try {
        const userId = await createUser(request.body);
        reply.code(201).send({ userId });
      } catch (err) {
        reply.code(400).send(err);
      }
    }
  );
};

module.exports = userRoutes;
