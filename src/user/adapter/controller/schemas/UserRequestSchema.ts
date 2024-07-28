const bodyJsonSchema = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: { type: 'string' },
    password: { type: 'string', pattern: '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$!%*?&])[A-Za-z\\d@#$!%*?&]{8,70}$' },
  },
};

const schema = {
  body: bodyJsonSchema,
};

export default schema;
