const Joi = require("joi");

const nameRole = {
  name: Joi.string().min(2).max(255).alphanum().trim().required(),
};

const sizeRole = {
  description: Joi.string().min(1).max(16000).trim().required(),
};
const newAnimalSchema = Joi.object({
  ...nameRole,
  ...sizeRole,
});

const validateNewAnimalSchema = (data) => {
  return newAnimalSchema, validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateNewAnimalSchema,
};
