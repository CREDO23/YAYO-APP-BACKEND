const joi = require("@hapi/joi");

const userRegisterSchema = joi.object({
  userName: joi.string().required(),
  firstName: joi.string(),
  lastName: joi.string(),
  sex: joi.string(),
  ageInterval: joi.string(),
  adress: joi.object().keys({
    quartier: joi.string(),
    ville: joi.string(),
    avenue: joi.string(),
  }),
  email: joi.string().required().email(),
  password: joi.string().required(),
  tickets: joi.object(),
  notifications: joi.object(),
  notificationsId: joi.string(),
});

module.exports = {
  userRegisterSchema,
};
