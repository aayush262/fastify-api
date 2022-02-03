const moment = require('moment');

const UserRepository = require('../dao/user.dao');

const userService = (fastify) => {
  const userRepository = UserRepository(fastify.db);

  const getUserById = async (userId) => {
    const user = await userRepository.getUserById(userId);
    const username = [user.first_name, user.middle_name, user.last_name]
      .filter((name) => name !== '')
      .filter((name) => name !== undefined)
      .filter((name) => name !== null)
      .join(' ');
    return {
      id: user.id,
      username,
      email: user.email,
      createdAt: moment(user.created_at).format('MM/DD/YYYY'),
      updatedAt: moment(user.updated_at).format('MM/DD/YYYY'),
      version: user.version,
    };
  };

  const createUser = async (user) => {
    const userId = await userRepository.saveUser(user);
    return userId;
  };

  return {
    getUserById,
    createUser,
  };
};

module.exports = userService;
