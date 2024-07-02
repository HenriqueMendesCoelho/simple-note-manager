const bodyJsonSchema = {
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
  },
};

const schema = {
  body: bodyJsonSchema,
};

export default schema;
