// schema for post request
const postRequestBody = {
  type: 'object',
  description: 'temporary test data schema',
  required: ['title'],
  properties: {
    title: {
      type: 'string',
    },
  },
};

// schema for post response
const postResponse = {
  201: {
    type: 'object',
    description: 'temporary test data post request',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
      },
    },
  },
};

// schema for get request
const getResponseBody = {
  200: {
    type: 'object',
    description: 'get Response body for this temporary tests',
    required: ['temps'],
    properties: {
      temps: {
        type: 'array',
        items: {
          type: 'object',
          required: ['id', 'title'],
          properties: {
            id: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};

const schema = {
  postRequestBody,
  postResponse,
  getResponseBody,
};

module.exports = schema;
