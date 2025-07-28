module.exports = async (schema, data) => {
    await schema.validateAsync(data, { abortEarly: false });
  };
  