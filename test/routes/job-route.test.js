const Fastify = require('fastify');
const moment = require('moment');

const JobRoutes = require('../../routes/jobRoute');
const JobService = require('../../src/services/job.service');

jest.mock('../../src/services/job.service');

const createJob = jest.fn();
const getAllJobs = jest.fn();

JobService.mockImplementation(() => ({
  createJob,
  getAllJobs,
}));

let app;

describe('job Routes', () => {
  beforeAll(async () => {
    app = Fastify();
    app.register(JobRoutes, {
      prefix: '/api/v1/jobs',
    });

    await app.ready();
  });

  it('should return 201 when a job is created with valid data', async () => {
    createJob.mockReturnValueOnce('some_uuid');

    const expiresAt = moment().add(4, 'd').format('YYYY-MM-DD');
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/jobs',
      payload: {
        title: 'React Developer',
        description: 'Awesome JS skills and hardworking',
        skills: 'Javascript, React, Html, CSS, Redux',
        minBudget: 20000,
        maxBudget: 50000,
        expiresAt,
        userId: 'fe8d0790-af00-465d-b386-c74873a23261',
      },
    });

    expect(res.statusCode).toBe(201);
    expect(res.json().jobId).toEqual('some_uuid');
  });

  it('should return 400 when a required field missing', async () => {
    createJob.mockReturnValueOnce('some_uuid');

    const expiresAt = moment().add(4, 'd').format('YYYY-MM-DD');
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/jobs',
      payload: {
        description: 'Awesome JS skills and hardworking',
        skills: 'Javascript, React, Html, CSS, Redux',
        minBudget: 20000,
        maxBudget: 50000,
        expiresAt,
        userId: 'fe8d0790-af00-465d-b386-c74873a23261',
      },
    });

    expect(res.statusCode).toBe(400);
  });
  it('should return 400 when expired date format is incorrect', async () => {
    createJob.mockReturnValueOnce('some_uuid');

    const expiresAt = moment().add(4, 'd').format('MM-DD-YYYY');
    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/jobs',
      payload: {
        title: 'React Js Developer',
        description: 'Awesome JS skills and hardworking',
        skills: 'Javascript, React, Html, CSS, Redux',
        minBudget: 20000,
        maxBudget: 50000,
        expiresAt,
        userId: 'fe8d0790-af00-465d-b386-c74873a23261',
      },
    });

    expect(res.statusCode).toBe(400);
  });

  it('should return 400 when expired date is less than the current date', async () => {
    createJob.mockReturnValueOnce('some_uuid');

    const res = await app.inject({
      method: 'POST',
      url: '/api/v1/jobs',
      payload: {
        title: 'React Js Developer',
        description: 'Awesome JS skills and hardworking',
        skills: 'Javascript, React, Html, CSS, Redux',
        minBudget: 20000,
        maxBudget: 50000,
        expiresAt: '2021-02-02',
        userId: 'fe8d0790-af00-465d-b386-c74873a23261',
      },
    });

    expect(res.statusCode).toBe(400);
    expect(res.json().message).toEqual('expired date must be future date');
  });
});
