const tempDao = (fastify) => {
  const getAll = () => fastify.db.query('select * from test');

  const save = (title) =>
    fastify.db.query('insert into test(title) values($1) returning id', [
      title,
    ]);

  return {
    getAll,
    save,
  };
};

module.exports = tempDao;
