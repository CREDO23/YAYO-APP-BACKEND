const joi = require('@hapi/joi');

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

const partnerRegisterSchema = joi.object({
  userName: joi.string().required(),
  firstName: joi.string(),
  lastName: joi.string(),
  shopAdress: joi.object().keys({
    quartier: joi.string().required(),
    ville: joi.string().required(),
    avenue: joi.string().required(),
  }),
  shopBrandName: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().required(),
  tickets: joi.object(),
  notifications: joi.object(),
  notificationsId: joi.string(),
  products: joi.array().required(),
});

const productRegisterSchema = joi.object({
  brandName: joi.string().required(),
  image: joi.string().required(),
  galery: joi.array(),
});

const ticketCategorieRegSchema = joi.object({
  brandName: joi.string().required(),
  value: joi.string().required(),
});

const ticketRegSchema = joi.object({
  owner: joi.string(),
  categorie: joi.string().required(),
  statut: joi.string(),
  value: joi.string(),
  notified: joi.boolean(),
});

const adminRegisterSchema = joi.object({
  userName: joi.string().required(),
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi.string().required().email(),
  password: joi.string().required(),
  notifications: joi.object(),
  notificationsId: joi.string(),
});

const loginVlidation = joi.object({
  userName: joi.string().required(),
  password: joi.string().required(),
});

module.exports = {
  userRegisterSchema,
  partnerRegisterSchema,
  productRegisterSchema,
  ticketCategorieRegSchema,
  ticketRegSchema,
  adminRegisterSchema,
  loginVlidation,
};
