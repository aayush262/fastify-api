const userRepository = (db) => {
  //Get user by user id;
  const getUserById = async (userId) => {
    try {
      return await db.one(`select * from users where id = $1`, [userId]);
    } catch (err) {
      throw Error(`${userId} does not exists`);
    }
  };

  //save user in db
  const saveUser = async (user) => {
    try {
      const { id } = await db.one(
        'insert into users(first_name,middle_name,last_name,password,email) values($1,$2,$3,$4,$5) returning id',
        [
          user.firstName,
          user.middleName,
          user.lastName,
          user.password,
          user.email,
        ]
      );

      return id;
    } catch (err) {
      throw Error('Not valid user data');
    }
  };

  return {
    getUserById,
    saveUser,
  };
};

module.exports = userRepository;
