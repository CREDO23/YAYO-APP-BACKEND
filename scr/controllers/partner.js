const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const Partner = require("../models/partner");
const utils = require("../utils/index");
const bcrpt = require("bcrypt");
const { partnerRegisterSchema } = require("../utils/schemasValidator");

const getAllPartners = async (req, res, next) => {
  try {
    const patners = await Partner.find().catch((error) => next(error));

    if (patners == null || !patners[0]) {
      next(createError.NotFound("There are not Partners yet"));
    } else if (patners) {
      res.json({ data: patners, success: true });
    }
  } catch (error) {
    next(error);
  }
};

const getPartner = async (req, res, next) => {
  const id = req.params.id;

  if (isValidObjectId(id)) {
    try {
      const partner = await Partner.findById(id).catch((error) => next(error));

      if (partner == null) {
        next(createError.NotFound("This Partner doesn't exist"));
      } else if (partner) {
        res.json({ data: partner, success: true });
      }
    } catch (error) {
      next(error);
    }
  } else {
    next(createError.BadRequest("Invalid ID"));
  }
};

const updatePartner = async (req, res, next) => {
  const id = req.params.id;
  const updated = req.body;

  if (isValidObjectId(id)) {
    if (!utils.isObjctEmpty(updated)) {
      try {
        const updatedPartner = await Partner.findByIdAndUpdate(id, updated, {
          new: true,
        }).catch((error) => next(error));

        if (updatedPartner) {
          res.json({
            message: "Updated successful",
            data: updatedPartner,
            success: true,
          });
        } else {
          throw createError.NotFound("This partner doesn't exist");
        }
      } catch (error) {
        next(error);
      }
    } else {
      next(createError.NotAcceptable("Please , mention the fields to update"));
    }
  } else {
    next(createError.BadRequest("Invalid ID"));
  }
};

const createPartner = async (req, res, next) => {
  try {
    const result = await partnerRegisterSchema.validateAsync(req.body);

    const isExist = await Partner.findOne({ userName: result.userName }).catch(
      (error) => next(error)
    );

    if (isExist) {
      throw createError.Conflict("This partner is already exist");
    }

    const salt = await bcrpt.genSalt(10);
    const password = await bcrpt.hash(result.password, salt);
    const newPartner = new Partner({ ...result, password });

    await newPartner.save();

    res.json({
      message: `The partner ${newPartner.userName} have been successful created `,
      data: newPartner,
      success: true,
    });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

const deletePartner = async (req, res, next) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    try {
      const deletedPartner = await Partner.findByIdAndDelete(id).catch(
        (error) => next(error)
      );

      if (deletedPartner) {
        res.json({
          message: "Deleted successful",
          data: deletedPartner,
          success: true,
        });
      } else {
        throw createError.NotFound("This partner doesn't exist");
      }
    } catch (error) {
      next(error);
    }
  } else {
    next(createError.BadRequest("Invalid ID"));
  }
};

module.exports = {
  getAllPartners,
  getPartner,
  updatePartner,
  createPartner,
  deletePartner,
};
