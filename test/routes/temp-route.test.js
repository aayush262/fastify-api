const build = require("../../src/App");

let app;

describe('temp route', () => {
  beforeAll(() => {
    app = build();
  });

  afterAll(() => {
    app.close();
  });

  it('should return id when post route is called with valid data', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/test',
      payload: {
        title: 'some test title',
      },
    });

    expect(res.statusCode).toBe(201);
    expect(res.json().id).toBeDefined();
  });

  it('should return all the tests when get route is called', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/test',
    });

    expect(res.statusCode).toBe(200);
  });
});
