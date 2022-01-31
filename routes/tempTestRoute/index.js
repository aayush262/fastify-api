const route = async (fastify) => {
  //   test get route
  fastify.get('/', async (request, reply) => {
    const allTests = await fastify.db.query('select * from test');

    reply.code(200).send(allTests);
  });

  //   test post route
  fastify.post('/', async (request, reply) => {
    fastify.log.info(`request with body ${request}`);
    const { title } = request.body;

    const id = await fastify.db.one(
      'insert into test(title) values($1) returning id',
      [title]
    );

    reply.code(201).send({ id });
  });
};

module.exports = route;
