const moment = require('moment');

const JobService = require('../../src/services/job.service');
const { postRequestBody } = require('./job.schema');

const jobRoutes = async (fastify) => {
  const { createJob } = JobService(fastify);

  fastify.post(
    '/',
    {
      schema: {
        body: postRequestBody,
      },
      preHandler: (request, reply, done) => {
        const { expiresAt } = request.body;
        const currentDate = moment().format('YYYY-MM-DD');

        if (expiresAt <= currentDate)
          reply.code(400).send({ message: 'expired date must be future date' });

        done();
      },
    },
    async (request, reply) => {
      const { job } = request.body;
      const jobId = await createJob(job);

      reply.code(201).send({
        jobId,
      });
    }
  );
};

module.exports = jobRoutes;
