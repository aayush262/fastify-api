const fastify = require('fastify');
const moment = require('moment');

const dbPlugin = require('../../plugin/database');
const JobRepository = require('../../src/dao/job.dao');
const UserRepository = require('../../src/dao/user.dao');

let app;
let userId;

describe('Job Repository', () => {
  const getUserById = async () => {
    const { saveUser } = UserRepository(app.db);

    const user = {
      firstName: 'peter',
      lastName: 'smith',
      password: 'password',
      email: 'abdc@gmail.com',
    };

    userId = await saveUser(user);
  };

  beforeAll(async () => {
    app = fastify();
    app.register(dbPlugin);

    await app.ready();

    await getUserById();
  });

  afterEach(() => {
    app.db.query('delete from jobs');
  });

  it('should save job when provided with valid job data', async () => {
    const { saveJob } = JobRepository(app.db);

    const expiresAt = moment().add(4, 'd').format('YYYY/MM/DD');
    const Job = {
      title: 'React Developer',
      description: 'Awesome JS skills and hardworking',
      skills: 'Javascript, React, Html, CSS, Redux',
      minBudget: '20000',
      maxBudget: '50000',
      expiresAt,
      userId,
    };

    const jobId = await saveJob(Job);
    expect(jobId).toBeDefined();
  });

  it('should throw an error if required field is not present', async () => {
    const { saveJob } = JobRepository(app.db);

    const Job = {
      title: 'React Developer',
      description: 'Awesome JS skills and hardworking',
      skills: 'Javascript, React, Html, CSS, Redux',
      minBudget: '20000',
      maxBudget: '50000',
      expiresAt: '2022/02/22',
    };

    await expect(saveJob(Job)).rejects.toThrow(Error('Not valid job data'));
  });

  it('should get all jobs available', async () => {
    const { saveJob, getAllJobs } = JobRepository(app.db);

    const expiresAt = moment().add(4, 'd').format('YYYY/MM/DD');
    const Job1 = {
      title: 'React Developer',
      description: 'Awesome JS skills and hardworking',
      skills: 'Javascript, React, Html, CSS, Redux',
      minBudget: '20000',
      maxBudget: '50000',
      expiresAt,
      userId,
    };
    const Job2 = {
      title: 'Javascript Developer',
      description: 'Awesome JS skills and hardworking',
      skills: 'Javascript, React, Html, CSS, Redux',
      minBudget: '20000',
      maxBudget: '50000',
      expiresAt,
      userId,
    };

    await saveJob(Job1);
    await saveJob(Job2);

    const jobs = await getAllJobs(1, 0);
    expect(jobs.length).toEqual(1);
    expect(jobs[0].title).toEqual('React Developer');

    const nextJobs = await getAllJobs(1, 1);
    expect(nextJobs.length).toEqual(1);
    expect(nextJobs[0].title).toEqual('Javascript Developer');
  });

  it('should get only the jobs that are not expired', async () => {
    const { saveJob, getAllJobs } = JobRepository(app.db);

    const expiresAt = moment().add(4, 'd').format('YYYY/MM/DD');
    const Job1 = {
      title: 'React Developer',
      description: 'Awesome JS skills and hardworking',
      skills: 'Javascript, React, Html, CSS, Redux',
      minBudget: '20000',
      maxBudget: '50000',
      expiresAt,
      userId,
    };
    const Job2 = {
      title: 'Javascript Developer',
      description: 'Awesome JS skills and hardworking',
      skills: 'Javascript, React, Html, CSS, Redux',
      minBudget: '20000',
      maxBudget: '50000',
      expiresAt: '2021/02/22',
      userId,
    };

    await saveJob(Job1);
    await saveJob(Job2);

    const jobs = await getAllJobs(2, 0);
    expect(jobs.length).toEqual(1);
    expect(jobs[0].title).toEqual('React Developer');
  });

  it('should fail to fetch jobs', async () => {
    const { getAllJobs } = JobRepository(app.db);

    const jobs = await getAllJobs(Number.MAX_SAFE_INTEGER, 0);
    expect(jobs.length).toEqual(0);
  });
});
