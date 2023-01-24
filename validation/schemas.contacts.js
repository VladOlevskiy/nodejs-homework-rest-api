const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.string().min(9).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  favorite: Joi.boolean(),
});

const schemaForChangeStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  schema,
  schemaForChangeStatus,
};
