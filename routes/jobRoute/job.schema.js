const postRequestBody = {
  type: 'object',
  required: [
    'title',
    'description',
    'skills',
    'minBudget',
    'maxBudget',
    'expiresAt',
    'userId',
  ],
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    skills: {
      type: 'string',
    },
    minBudget: {
      type: 'number',
    },
    maxBudget: {
      type: 'number',
    },
    expiresAt: {
      type: 'string',
      format: 'date',
    },
    userId: {
      type: 'string',
      format: 'uuid',
    },
  },
};

module.exports = {
  postRequestBody,
};
