const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'number',
      default: 3333,
    },
  },
};
const configEnvOptions = {
  confKey: 'config',
  schema: schema,
  data: process.env
};

export default configEnvOptions;
