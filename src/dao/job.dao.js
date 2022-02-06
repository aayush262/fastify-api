const moment = require('moment');

const jobRepository = (db) => {
  const getAllJobs = async (limit, offset) => {
    try {
      const currentDate = moment().format('YYYY/MM/DD');
      const jobs = await db.query(
        `
         select * from jobs where expires_at >= $1 order by created_at limit $2 offset $3
        `,
        [currentDate, limit, offset]
      );

      return jobs;
    } catch (err) {
      throw Error(err);
    }
  };

  const saveJob = async (job) => {
    try {
      const { id } = await db.one(
        'insert into jobs(title,description,skills,min_budget,max_budget,expires_at,user_id) values($1,$2,$3,$4,$5,$6,$7) returning id',
        [
          job.title,
          job.description,
          job.skills,
          job.minBudget,
          job.maxBudget,
          job.expiresAt,
          job.userId,
        ]
      );

      return id;
    } catch (err) {
      throw Error('Not valid job data');
    }
  };

  return {
    getAllJobs,
    saveJob,
  };
};

module.exports = jobRepository;
