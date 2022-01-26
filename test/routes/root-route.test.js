const build = require('./../../src/App');

let app;
describe('Root route', () => {
  beforeEach(() => {
    app = build();
  });

  afterEach(() => {
    app.close();
  });

  it('should return 200 when root route called', async () => {
    const res = await app.inject({
      url: '/',
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ FirstMessage: 'Hello from fastify server' });
  });
});
