const Joi = require("joi");

const emailRole = {
  email: Joi.string().email().min(6).max(255).trim().required(),
};

const passwordRole = {
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    )
    .required(),
};

const firstNameRole = {
  firstName: Joi.string().min(2).max(255).alphanum().trim().required(),
};

const lastNameRole = {
  lastName: Joi.string().min(2).max(255).alphanum().trim().required(),
};

const phoneRole = {
  phone: Joi.string().min(3).max(255).trim(),
};

const signUpSchema = Joi.object({
  ...emailRole,
  ...passwordRole,
  ...firstNameRole,
  ...lastNameRole,
  ...phoneRole,
});

const validateSignUpSchema = (data) => {
  return signUpSchema.validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateSignUpSchema,
};
