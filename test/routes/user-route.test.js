const Fastify = require('fastify');
const UserRoutes = require('../../routes/userRoute');
const UserService = require('../../src/services/user.service');

jest.mock('./../../src/services/user.service');

const createUser = jest.fn();
const getUserById = jest.fn();

UserService.mockImplementation(() => ({
  createUser,
  getUserById,
}));

let app;

describe('user route', () => {
  beforeAll(async () => {
    app = Fastify();
    app.register(UserRoutes, {
      prefix: 'api/v1/users',
    });

    await app.ready();
  });

  it('should return 201 with valid insert data', async () => {
    createUser.mockReturnValueOnce('some_uuid');

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
    expect(res.json().userId).toEqual('some_uuid');
  });

  it('should return 400 with ivalid user data', async () => {
    createUser.mockImplementation(() => {
      throw Error('Invalid Data');
    });

    const res = await app.inject({
      method: 'POST',
      url: 'api/v1/users',
      payload: {
        firstName: 'peter',
        password: 'password',
        email: 'abdc@gmail.com',
      },
    });

    expect(res.statusCode).toBe(400);
    expect(res.json().message).toEqual('Invalid Data');
  });

  it('should return 400 when email format is incorrect', async () => {
    createUser.mockReturnValueOnce('some_uuid');

    const res = await app.inject({
      method: 'POST',
      url: 'api/v1/users',
      payload: {
        first_name: 'peter',
        password: 'password',
        email: 'email',
      },
    });

    expect(res.statusCode).toBe(400);
  });

  it('should return 400 when password and firstName is not present', async () => {
    createUser.mockReturnValueOnce('some_uuid');

    const res = await app.inject({
      method: 'POST',
      url: 'api/v1/users',
      payload: {
        email: 'email',
      },
    });

    expect(res.statusCode).toBe(400);
  });

  it('should return 200 when user exists', async () => {
    getUserById.mockReturnValueOnce({
      id: '2eb7b7b5-ef14-48c6-ae98-5d8e1f40e353',
      username: 'peter',
      email: 'abdc@gmail.com',
      createdAt: '03/02/2022',
      updatedAt: '04/02/2022',
      version: '56c32df5-77a7-4a45-98f8-c5f2d7068f7d',
    });

    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/users/2eb7b7b5-ef14-48c6-ae98-5d8e1f40e353',
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({
      id: '2eb7b7b5-ef14-48c6-ae98-5d8e1f40e353',
      username: 'peter',
      email: 'abdc@gmail.com',
      createdAt: '03/02/2022',
      updatedAt: '04/02/2022',
      version: '56c32df5-77a7-4a45-98f8-c5f2d7068f7d',
    });
  });

  it('should return 400 when user id is invalid', async () => {
    getUserById.mockReturnValueOnce({
      id: '2eb7b7b5-ef14-48c6-ae98-5d8e1f40e353',
      username: 'peter',
      email: 'abdc@gmail.com',
      createdAt: '03/02/2022',
      upDatedAt: '04/02/2022',
      version: '56c32df5-77a7-4a45-98f8-c5f2d7068f7d',
    });

    const res = await app.inject({
      method: 'GET',
      url: '/api/v1/users/some-invalid-id',
    });

    expect(res.statusCode).toBe(400);
  });
});
