const Fastify = require('fastify');
const dbPlugin = require("../../plugin/database");
const userRepository = require("../../src/dao/user.dao");

let app;

describe('User Repository', () => {
  beforeAll(async () => {
    app = Fastify();
    app.register(dbPlugin);

    await app.ready();
  });

  beforeEach(async () => {
    app.db.query('delete from users');
  });

  it('should save user in db', async () => {
    const user = {
      firstName: 'peter',
      lastName: 'smith',
      password: 'password',
      email: 'abdc@gmail.com',
    };

    const { saveUser } = userRepository(app.db);

    const userId = await saveUser(user);

    expect(userId).toBeDefined();
  });

  it('should throw an error when required field is not present', async () => {
    const user = {
      firstName: 'peter',
      lastName: 'smith',
    };

    const { saveUser } = userRepository(app.db);

    await expect(saveUser(user)).rejects.toThrow(Error('Not valid user data'));
  });

  it('should return a user when user exists in database', async () => {
    const user = {
      firstName: 'peter',
      lastName: 'smith',
      password: 'password',
      email: 'abdc@gmail.com',
    };

    const { saveUser, getUserById } = userRepository(app.db);

    const userId = await saveUser(user);

    const dbUser = await getUserById(userId);

    expect(dbUser.first_name).toEqual('peter');
  });

  it('should throw and error when user doesnot exists in database', async () => {
    const { getUserById } = userRepository(app.db);

    await expect(getUserById('user_uuid')).rejects.toThrow(
      Error('user_uuid does not exists')
    );
  });
});
