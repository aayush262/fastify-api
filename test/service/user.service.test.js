const UserService = require("../../src/services/user.service");
const UserRepository = require("../../src/dao/user.dao");

jest.mock('./../../src/dao/user.dao');

const getUserById = jest.fn();
const saveUser = jest.fn();

describe('user service', () => {
  beforeAll(() => {
    UserRepository.mockImplementation(() => ({
      getUserById,
      saveUser,
    }));
  });

  it('should create a user and return userId', async () => {
    saveUser.mockReturnValueOnce('some_uuid');
    const user = {
      first_name: 'peter',
      middle_name: 'middle name',
      last_name: 'smith',
      password: 'password',
      email: 'abdc@gmail.com',
    };

    const userService = UserService({});
    const userId = await userService.createUser(user);

    expect(userId).toEqual('some_uuid');
    expect(saveUser).toHaveBeenCalledWith(user);
  });

  it('should return a user if user exists', async () => {
    getUserById.mockReturnValueOnce({
      id: 'uuid',
      first_name: 'peter',
      middle_name: 'middle name',
      last_name: 'smith',
      email: 'abdc@gmail.com',
      created_at: '2022-02-02 08:20:05.191325+00',
      updated_at: '2022-02-02 08:20:05.191325+00',
      version: 'uuid',
    });

    const userService = UserService({});
    const user = await userService.getUserById('uuid');

    expect(user).toEqual({
      id: 'uuid',
      username: 'peter middle name smith',
      email: 'abdc@gmail.com',
      createdAt: '02/02/2022',
      updatedAt: '02/02/2022',
      version: 'uuid',
    });
    expect(getUserById).toHaveBeenCalledWith('uuid');
  });
});
