const Fastify = require('fastify');
const dbPlugin = require("../../plugin/database");
const applyMigration = require("../../plugin/helper/migration");

jest.mock('./../../plugin/helper/migration');

describe('database plugin', () => {
  beforeAll(() => {
    applyMigration.mockImplementation(() => jest.fn());
  });

  it('should be able to attach db decorate on fastify', async () => {
    const fastify = Fastify();
    fastify.register(dbPlugin);

    await fastify.ready();

    expect(fastify.db).toBeDefined();

    await fastify.close();
  });
});
