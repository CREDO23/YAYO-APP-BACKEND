const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const Product = require("../models/product");
const utils = require("../utils/index");
const { productRegisterSchema } = require("../utils/schemasValidator");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().catch((error) => next(error));

    if (products == null || !products[0]) {
      next(createError.NotFound("There are not Products yet"));
    } else if (products) {
      res.json({ data: products, success: true });
    }
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  const id = req.params.id;

  if (isValidObjectId(id)) {
    try {
      const product = await Product.findById(id).catch((error) => next(error));

      if (product == null) {
        next(createError.NotFound("This Product doesn't exist"));
      } else if (product) {
        res.json({ data: product, success: true });
      }
    } catch (error) {
      next(error);
    }
  } else {
    next(createError.BadRequest("Invalid ID"));
  }
};

const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const updated = req.body;

  if (isValidObjectId(id)) {
    if (!utils.isObjctEmpty(updated)) {
      try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updated, {
          new: true,
        }).catch((error) => next(error));

        if (updatedProduct) {
          res.json({
            message: "Updated successful",
            data: updatedProduct,
            success: true,
          });
        } else {
          throw createError.NotFound("This Product doesn't exist");
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

const createProduct = async (req, res, next) => {
  try {
    const result = await productRegisterSchema.validateAsync(req.body);

    const isExist = await Product.findOne({
      brandName: result.brandName,
    }).catch((error) => next(error));

    if (isExist) {
      throw createError.Conflict("This Product is already exist");
    }

    const newPoduct = new Product({ ...result });

    const savedProduct = await newPoduct.save();

    res.json({
      message: `Created successful`,
      data: savedProduct,
      success: true,
    });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id).catch(
        (error) => next(error)
      );

      if (deletedProduct) {
        res.json({
          message: "Deleted successful",
          data: deletedProduct,
          success: true,
        });
      } else {
        throw createError.NotFound("This Product doesn't exist");
      }
    } catch (error) {
      next(error);
    }
  } else {
    next(createError.BadRequest("Invalid ID"));
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct,
};
