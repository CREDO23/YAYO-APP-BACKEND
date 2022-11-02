const Customer = require('../models/customer');
const Partner = require('../models/partner');
const Admin = require('../models/admin');
const createError = require('http-errors');
const bcrpt = require('bcrypt');
const { singUpdatePasswordToken } = require('../utils/jwt/jwt');
const sendEmail = require('../utils/email/sendEmail');
const { genhtmlDoc } = require('../utils/html/generateHtmlDoc');

const forgotPassword = async (req, res, next) => {
  const userName = req.body.userName;

  try {
    const { email } =
      (await Customer.findOne({ userName }).catch((error) => next(error))) ||
      (await Partner.findOne({ userName }).catch((error) => next(error))) ||
      (await Admin.findOne({ userName }).catch((error) => next(error)));

    const token = await singUpdatePasswordToken(userName);

    const htmlDoc = await genhtmlDoc(
      '',
      'Reset password',
      'A password reset event as been triggered . <br/> <br/> The password window is limited to five minutes . <br/> <br/> To complete the password reset process , visit the following link :',
      '',
      `${process.env.FRONTEND_URL}/reset_password/${token}`,
      'YAYO',
    );

    await sendEmail(email, 'Reset password', htmlDoc);

    res.json({
      message: 'Email sent',
      data: null,
      success: true,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  const userName = req.userName;
  const password = req.body.password;

  try {
    const salt = await bcrpt.genSalt(10);
    const hash = await bcrpt.hash(password, salt);

    const user =
      (await Customer.findOne({ userName }).catch((error) => next(error))) ||
      (await Partner.findOne({ userName }).catch((error) => next(error))) ||
      (await Admin.findOne({ userName }).catch((error) => next(error)));

    let updatedUser;

    switch (user.role) {
      case 'customer':
        updatedUser = await Customer.findOneAndUpdate(
          { userName },
          { password: hash },
        );
        break;

      case 'partner':
        updatedUser = await Partner.findOneAndUpdate(
          { userName },
          { password: hash },
        );
        break;

      case 'admin':
        updatedUser = await Admin.findOneAndUpdate(
          { userName },
          { password: hash },
        );
        break;

      case 'superAdmin':
        updatedUser = await Admin.findOneAndUpdate(
          { userName },
          { password: hash },
        );
        break;

      default:
        break;
    }

    if (!updatedUser) next(createError.NotFound('User not found'));

    if (updatedUser) {
      res.json({
        message: 'Password reseted successful',
        data: updatedUser,
        error: null,
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { forgotPassword, updatePassword };
