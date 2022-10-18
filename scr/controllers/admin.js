const createError = require('http-errors');
const { isValidObjectId } = require('mongoose');
const Admin = require('../models/admin');
const utils = require('../utils/index');
const bcrpt = require('bcrypt');
const { adminRegisterSchema } = require('../utils/schemasValidator');

const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find().catch((error) => next(error));

    if (admins == null || !admins[0]) {
      next(createError.NotFound('There are not Admins yet'));
    } else if (admins) {
      res.json({ data: admins, success: true, error: null });
    }
  } catch (error) {
    next(error);
  }
};

const getAdmin = async (req, res, next) => {
  const id = req.params.id;

  if (isValidObjectId(id)) {
    try {
      const admin = await Admin.findById(id).catch((error) => next(error));

      if (admin == null) {
        next(createError.NotFound("This Admin doesn't exist"));
      } else if (admin) {
        res.json({ data: admin, success: true, error: null });
      }
    } catch (error) {
      next(error);
    }
  } else {
    next(createError.BadRequest('Invalid ID'));
  }
};

const updateAdmin = async (req, res, next) => {
  const id = req.params.id;
  const updated = req.body;

  if (isValidObjectId(id)) {
    if (!utils.isObjctEmpty(updated)) {
      try {
        const updatedAdmin = await Admin.findByIdAndUpdate(id, updated, {
          new: true,
        }).catch((error) => next(error));

        if (updatedAdmin) {
          res.json({
            message: 'Updated successful',
            data: updatedAdmin,
            success: true,
            error: null,
          });
        } else {
          throw createError.NotFound("This Admin doesn't exist");
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

const createAdmin = async (req, res, next) => {
  try {
    const result = await adminRegisterSchema.validateAsync(req.body);

    const isExist = await Admin.findOne({ userName: result.userName }).catch(
      (error) => next(error),
    );

    if (isExist) {
      throw createError.Conflict('This Admin is already exist');
    }

    const salt = await bcrpt.genSalt(10);
    const password = await bcrpt.hash(result.password, salt);
    const newAdmin = new Admin({ ...result, password });

    const savedAdmin = await newAdmin.save();

    res.json({
      message: `Created successful`,
      data: savedAdmin,
      success: true,
      error: null,
    });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

const deleteAdmin = async (req, res, next) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    try {
      const deletedAdmin = await Admin.findByIdAndDelete(id).catch((error) =>
        next(error),
      );

      if (deletedAdmin) {
        res.json({
          message: 'Deleted successful',
          data: deletedAdmin,
          success: true,
          error: null,
        });
      } else {
        throw createError.NotFound("This Admin doesn't exist");
      }
    } catch (error) {
      next(error);
    }
  } else {
    next(createError.BadRequest('Invalid ID'));
  }
};

module.exports = {
  getAllAdmins,
  getAdmin,
  updateAdmin,
  createAdmin,
  deleteAdmin,
};
