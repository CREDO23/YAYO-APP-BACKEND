const createError = require('http-errors');
const { isValidObjectId } = require('mongoose');
const Customer = require('../models/customer');
const Partner = require('../models/partner');
const Admin = require('../models/admin');
const sendMail = require('../utils/email/sendEmail');
const utils = require('../utils/index');
const {
  partnerRegisterSchema,
} = require('../utils/validationSchemas/schemasValidator');

// function (user, header, body, img, link, footer )
const { genhtmlDoc } = require('../utils/html/generateHtmlDoc');

const getAllPartners = async (req, res, next) => {
  try {
    const search = req?.query?.search || '';
    const page = req?.query?.page || 1;
    const pageSize = req?.query?.pageSize || 10;
    const sort = req?.query?.sort || 'asc';

    const totalDocument = await Partner.countDocuments();

    const pageNumber = Math.ceil(totalDocument / pageSize);

    const patners = await Partner.find()
      .sort(sort)
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .catch((error) => next(error));

    if (patners == null || !patners[0]) {
      next(createError.NotFound('Not Found'));
    } else if (patners) {
      res.json({
        data: patners,
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

const getPartner = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.userId;

  if (isValidObjectId(id)) {
    if (id === userId) {
      try {
        const partner = await Partner.findById(id).catch((error) =>
          next(error),
        );

        if (partner == null) {
          next(createError.NotFound("This Partner doesn't exist"));
        } else if (partner) {
          res.json({ data: partner, success: true, error: null });
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

const updatePartner = async (req, res, next) => {
  const id = req.params.id;
  const updated = req.body;
  const userId = req.userId;

  if (isValidObjectId(id)) {
    if (!utils.isObjctEmpty(updated)) {
      if (id === userId) {
        try {
          const updatedPartner = await Partner.findByIdAndUpdate(id, updated, {
            new: true,
          }).catch((error) => next(error));

          if (updatedPartner) {
            res.json({
              message: 'Updated successful',
              data: updatedPartner,
              success: true,
              error: null,
            });
          } else {
            throw createError.NotFound("This partner doesn't exist");
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

const createPartner = async (req, res, next) => {
  try {
    const result = await partnerRegisterSchema.validateAsync(req.body);

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
      throw createError.Conflict('This partner is already exist');
    }

    const newPartner = new Partner({ ...result });

    const savedPartner = await newPartner.save();

    const htmlDoc = await genhtmlDoc(
      savedPartner?.userName,
      'Welcome Back',
      'We are happpy to meet you , welcome !',
      'https://images.pexels.com/photos/5584156/pexels-photo-5584156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      null,
      'Thanks',
    );

    await sendMail(savedPartner.email, 'Welcome', htmlDoc);

    res.json({
      message: `Created successful`,
      data: savedPartner,
      success: true,
      error: null,
    });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

const deletePartner = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.userId;

  if (isValidObjectId(id)) {
    if (id === userId) {
      try {
        const deletedPartner = await Partner.findByIdAndDelete(id).catch(
          (error) => next(error),
        );

        if (deletedPartner) {
          res.json({
            message: 'Deleted successful',
            data: deletedPartner,
            success: true,
            error: null,
          });
        } else {
          throw createError.NotFound("This partner doesn't exist");
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
  getAllPartners,
  getPartner,
  updatePartner,
  createPartner,
  deletePartner,
};
