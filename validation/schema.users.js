const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

module.exports = {
  schema,
};
