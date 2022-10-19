const createError = require('http-errors');
const { isValidObjectId } = require('mongoose');
const Customer = require('../models/customer');
const utils = require('../utils/index');
const { userRegisterSchema } = require('../utils/schemasValidator');

const getAllUsers = async (req, res, next) => {
  try {
    const customers = await Customer.find().catch((error) => next(error));

    if (customers == null || !customers[0]) {
      next(createError.NotFound('There are not Users yet'));
    } else if (customers) {
      res.json({ data: customers, success: true, error: null });
    }
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const id = req.params.id;

  if (isValidObjectId(id)) {
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
    next(createError.BadRequest('Invalid ID'));
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const updated = req.body;

  if (isValidObjectId(id)) {
    if (!utils.isObjctEmpty(updated)) {
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
      next(createError.NotAcceptable('Please , mention the fields to update'));
    }
  } else {
    next(createError.BadRequest('Invalid ID'));
  }
};

const createUser = async (req, res, next) => {
  try {
    const result = await userRegisterSchema.validateAsync(req.body);

    const isExist = await Customer.findOne({ userName: result.userName }).catch(
      (error) => next(error),
    );

    if (isExist) {
      throw createError.Conflict('This user is already exist');
    }

    const newUser = new Customer({ ...result });

    const savedUser = await newUser.save();

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
  if (isValidObjectId(id)) {
    try {
      const deletedUser = await Customer.findByIdAndDelete(id).catch((error) =>
        next(error),
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
