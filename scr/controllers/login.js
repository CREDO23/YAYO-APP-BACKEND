const {
  loginVlidation,
} = require('../utils/validationSchemas/schemasValidator');
const { singAccessToken } = require('../utils/jwt/jwt');
const createError = require('http-errors');
const bcrpt = require('bcrypt');
const Customer = require('../models/customer');
const Partner = require('../models/partner');
const Admin = require('../models/admin');
const login = async (req, res, next) => {
  try {
    const result = await loginVlidation.validateAsync(req.body);

    const user =
      (await Customer.findOne({ userName: result.email }).catch((error) =>
        next(error),
      )) ||
      (await Partner.findOne({ userName: result.email }).catch((error) =>
        next(error),
      )) ||
      (await Admin.findOne({ userName: result.email }).catch((error) =>
        next(error),
      ));

    if (!user) throw createError.NotFound("This User doesn't exist");

    const isMatchPassword = await bcrpt.compare(result.password, user.password);

    if (!isMatchPassword)
      throw createError.BadRequest('Invalid userName or password');

    if (isMatchPassword) {
      const token = await singAccessToken(user.id, user.role);
      res.json({
        message: `Authentificate as ${user.email}`,
        data: token,
        success: true,
        error: null,
      });
    }
  } catch (error) {
    if (error.isJoi) {
      return next(createError.Unauthorized('Invalid userName or password'));
    }
    next(error);
  }
};

module.exports = {
  login,
};
