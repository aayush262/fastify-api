const moment = require('moment');

const JobService = require('../../src/services/job.service');
const JobRepository = require('../../src/dao/job.dao');

jest.mock('../../src/dao/job.dao');

const getAllJobsDao = jest.fn();
const saveJob = jest.fn();

describe('Job service', () => {
  beforeAll(() => {
    JobRepository.mockImplementation(() => ({
      getAllJobs: getAllJobsDao,
      saveJob,
    }));
  });

  it('should return job id when job is valid', async () => {
    saveJob.mockReturnValueOnce('some uuid');

    const { createJob } = JobService({});

    const expiresAt = moment().add(4, 'd').format('YYYY/MM/DD');
    const Job = {
      title: 'React Developer',
      description: 'Awesome JS skills and hardworking',
      skills: 'Javascript, React, Html, CSS, Redux',
      minBudget: '20000',
      maxBudget: '50000',
      expiresAt,
    };

    const jobId = await createJob(Job);

    expect(jobId).toEqual('some uuid');
  });

  it('should return all jobs', async () => {
    getAllJobsDao.mockImplementation(() => [
      {
        title: 'test',
        created_at: '2022-02-02 08:20:05.191325+00',
        updated_at: '2022-02-02 08:20:05.191325+00',
      },
    ]);

    const { getAllJobs } = JobService({});

    const jobs = await getAllJobs(1, 0);

    expect(jobs.length).toEqual(1);
    expect(jobs[0].title).toEqual('test');
    expect(jobs[0].createdAt).toEqual('02/02/2022');
    expect(jobs[0].updatedAt).toEqual('02/02/2022');
    expect(jobs[0].created_at).not.toBeDefined();
  });
});
