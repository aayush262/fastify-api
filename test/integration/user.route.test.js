const build = require('../../src/App');

let app;

describe('user route integration test', () => {
  beforeAll(() => {
    app = build();
  });

  afterAll(() => {
    app.close();
  });

  it('should save user when called with valid data', async () => {
    const res = await app.inject({
      method: 'POST',
      url: 'api/v1/users',
      payload: {
        firstName: 'peter',
        password: 'password',
        email: 'abdc@gmail.com',
      },
    });

    expect(res.statusCode).toBe(201);
    expect(res.json().userId).toBeDefined();
  });

  it('should return user when called with valid userId param', async () => {
    const response = await app.inject({
      method: 'POST',
      url: 'api/v1/users',
      payload: {
        firstName: 'peter',
        password: 'password',
        email: 'abdc@gmail.com',
      },
    });

    const { userId } = response.json();

    const res = await app.inject({
      method: 'GET',
      url: `/api/v1/users/${userId}`,
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toBeDefined();
    expect(res.json().username).toEqual('peter');
    expect(res.json().email).toEqual('abdc@gmail.com');
  });
});
