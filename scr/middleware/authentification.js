const { expressjwt: express_Jwt } = require('express-jwt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const createError = require('http-errors');
dotenv.config();

module.exports = {
  auth: express_Jwt({
    secret: process.env.PRIVATE_SECRET,
    algorithms: ['HS256'],
  }).unless({
    path: [
      '/login',
      '/customers/create',
      '/tickets',
      '/ticketCategories',
      '/products',
      '/password/forgot',
      '/password/reset',
    ],
  }),

  adminAuth: (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];

    jwt.verify(token, process.env.PRIVATE_SECRET, (error, decoded) => {
      if (error) next(error);

      if (
        decoded &&
        (decoded.role === 'admin' || decoded.role === 'superAdmin')
      ) {
        req.userId = decoded.id;
        next();
      } else {
        next(createError.Unauthorized('Unauthorized'));
      }
    });
  },

  superAdminAuth: (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];

    jwt.verify(token, process.env.PRIVATE_SECRET, (error, decoded) => {
      if (error) next(error);

      if (decoded && decoded.role === 'superAdmin') {
        req.userId = decoded.id;
        next();
      } else {
        next(createError.Unauthorized('Unauthorized'));
      }
    });
  },

  partnerAuth: (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];

    jwt.verify(token, process.env.PRIVATE_SECRET, (error, decoded) => {
      if (error) next(error);

      if (
        decoded &&
        (decoded.role === 'admin' ||
          decoded.role === 'superAdmin' ||
          decoded.role === 'partner')
      ) {
        req.userId = decoded.id;
        next();
      } else {
        next(createError.Unauthorized('Unauthorized'));
      }
    });
  },

  customersAuth: (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];

    jwt.verify(token, process.env.PRIVATE_SECRET, (error, decoded) => {
      if (error) {
        next(error);
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  },

  forgotPassMiddle: (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];

    jwt.verify(token, process.env.RESET_PASSWORD_SECRET, (error, decoded) => {
      if (error) {
        next(error);
      } else {
        req.userName = decoded.userName;
        next();
      }
    });
  },
};
