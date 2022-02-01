const tempDao = require("../dao/temp.dao");

const tempService = (fastify) => {
  const dao = tempDao(fastify);

  const getAllTests = () => dao.getAll();

  const save = (title) => dao.save(title);

  return {
    getAllTests,
    save,
  };
};

module.exports = tempService;
