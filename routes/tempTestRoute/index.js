const tempService = require("../../src/services/temp.service");
const {
  postRequestBody,
  postResponse,
  getResponseBody,
} = require('./temp.schema');

const route = async (fastify) => {
  //   test get route

  const { getAllTests, save } = tempService(fastify);

  fastify.get(
    '/',
    {
      schema: {
        response: getResponseBody,
      },
    },
    async (request, reply) => {
      const allTests = await getAllTests();

      reply.code(200).send({
        temps: allTests,
      });
    }
  );

  //   test post route
  fastify.post(
    '/',
    {
      schema: {
        body: postRequestBody,
        response: postResponse,
      },
    },
    async (request, reply) => {
      fastify.log.info(`request with body ${request}`);
      const { title } = request.body;

      const id = await save(title);

      reply.code(201).send(id[0]);
    }
  );
};

module.exports = route;
