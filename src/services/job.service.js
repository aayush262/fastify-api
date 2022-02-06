const moment = require('moment');

const JobRepository = require('../dao/job.dao');

const jobService = (fastify) => {
  const jobRepository = JobRepository(fastify.db);

  const getAllJobs = async (limit, offset) => {
    const jobs = await jobRepository.getAllJobs(limit, offset);

    const newJobs = jobs.map((job) => {
      const newJob = { ...job };
      newJob.createdAt = moment(job.created_at).format('MM/DD/YYYY');
      newJob.updatedAt = moment(job.updated_at).format('MM/DD/YYYY');
      delete newJob.created_at;
      delete newJob.updated_at;
      return newJob;
    });

    return newJobs;
  };

  const createJob = async (job) => {
    const jobId = await jobRepository.saveJob(job);
    return jobId;
  };
  return {
    getAllJobs,
    createJob,
  };
};

module.exports = jobService;
