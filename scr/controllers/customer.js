const createError = require('http-errors');
const { isValidObjectId } = require('mongoose');
const Customer = require('../models/customer');
const Partner = require('../models/partner');
const Admin = require('../models/admin');
const utils = require('../utils/index');
const sendMail = require('../utils/email/sendEmail');
const {
  userRegisterSchema,
} = require('../utils/validationSchemas/schemasValidator');

// function (user, header, body, img, link, footer )
const { genhtmlDoc } = require('../utils/html/generateHtmlDoc');

const getAllUsers = async (req, res, next) => {
  try {
    const search = req?.query?.search || '';
    const page = req?.query?.page || 1;
    const pageSize = req?.query?.pageSize || 10;
    const sort = req?.query?.sort || 'asc';

    const totalDocument = await Customer.countDocuments();

    const pageNumber = Math.ceil(totalDocument / pageSize);

    const customers = await Customer.find()
      .sort(sort)
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .catch((error) => next(error));

    if (customers == null || !customers[0]) {
      next(createError.NotFound('Not found'));
    } else if (customers) {
      res.json({
        data: customers,
        success: true,
        error: null,
        info: {
          pageNumber,
          totalDocuments: totalDocument,
          searchQuery: search,
          page,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.userId;

  if (isValidObjectId(id)) {
    if (id === userId) {
      try {
        const customer = await Customer.findById(id).catch((error) =>
          next(error),
        );

        if (customer == null) {
          next(createError.NotFound("This User doesn't exist"));
        } else if (customer) {
          res.json({ data: customer, success: true, error: null });
        }
      } catch (error) {
        next(error);
      }
    } else {
      next(createError.Unauthorized('Unauthorized'));
    }
  } else {
    next(createError.BadRequest('Invalid ID'));
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const updated = req.body;
  const userId = req.userId;

  if (isValidObjectId(id)) {
    if (!utils.isObjctEmpty(updated)) {
      if (id === userId) {
        try {
          const updatedUser = await Customer.findByIdAndUpdate(id, updated, {
            new: true,
          }).catch((error) => next(error));

          if (updatedUser) {
            res.json({
              message: 'Updated successful',
              data: updatedUser,
              success: true,
              error: null,
            });
          } else {
            throw createError.NotFound("This user doesn't exist");
          }
        } catch (error) {
          next(error);
        }
      } else {
        next(createError.Unauthorized('Unauthorized'));
      }
    } else {
      next(createError.NotAcceptable('Please , mention the fields to update'));
    }
  } else {
    next(createError.BadRequest('Invalid ID'));
  }
};

const createUser = async (req, res, next) => {
  try {
    const result = await userRegisterSchema.validateAsync(req.body);

    const isExist =
      (await Customer.findOne({ userName: result.userName }).catch((error) =>
        next(error),
      )) ||
      (await Partner.findOne({ userName: result.userName }).catch((error) =>
        next(error),
      )) ||
      (await Admin.findOne({ userName: result.userName }).catch((error) =>
        next(error),
      ));

    if (isExist) {
      throw createError.Conflict('This user is already exist');
    }

    const newUser = new Customer({ ...result });

    const savedUser = await newUser.save();

    const htmlDoc = await genhtmlDoc(
      savedUser?.userName,
      'Welcome Back',
      'We are happpy to meet you , welcome !',
      'https://images.pexels.com/photos/5584156/pexels-photo-5584156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      null,
      'Thanks',
    );

    await sendMail(savedUser.email, 'Welcome', htmlDoc);

    res.json({
      message: `Created successful`,
      data: savedUser,
      success: true,
      error: null,
    });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.userId;

  if (isValidObjectId(id)) {
    if (id === userId) {
      try {
        const deletedUser = await Customer.findByIdAndDelete(id).catch(
          (error) => next(error),
        );

        if (deletedUser) {
          res.json({
            message: 'Deleted successful',
            data: deletedUser,
            success: true,
            error: null,
          });
        } else {
          throw createError.NotFound("This user doesn't exist");
        }
      } catch (error) {
        next(error);
      }
    } else {
      next(createError.Unauthorized('Unauthorized'));
    }
  } else {
    next(createError.BadRequest('Invalid ID'));
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
};
