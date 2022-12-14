const createError = require('http-errors');
const { isValidObjectId } = require('mongoose');
const TicketCategorie = require('../models/ticketCategorie');
const utils = require('../utils/index');
const {
  ticketCategorieRegSchema,
} = require('../utils/validationSchemas/schemasValidator');

const getAllTicketCategorie = async (req, res, next) => {
  try {
    const search = req?.query?.search || '';
    const page = req?.query?.page || 1;
    const pageSize = req?.query?.pageSize || 10;
    const sort = req?.query?.sort || 'asc';

    const totalDocument = await TicketCategorie.countDocuments();

    const pageNumber = Math.ceil(totalDocument / pageSize);

    const ticketCategories = await TicketCategorie.find()
      .sort(sort)
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .catch((error) => next(error));

    if (ticketCategories == null || !ticketCategories[0]) {
      next(createError.NotFound('There are not Ticket categories yet'));
    } else if (ticketCategories) {
      res.json({
        data: ticketCategories,
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

const getTicketCategorie = async (req, res, next) => {
  const id = req.params.id;

  if (isValidObjectId(id)) {
    try {
      const ticketCategorie = await TicketCategorie.findById(id).catch(
        (error) => next(error),
      );

      if (ticketCategorie == null) {
        next(createError.NotFound("This Ticket categorie doesn't exist"));
      } else if (ticketCategorie) {
        res.json({ data: ticketCategorie, success: true, error: null });
      }
    } catch (error) {
      next(error);
    }
  } else {
    next(createError.BadRequest('Invalid ID'));
  }
};

const updateTicketCategorie = async (req, res, next) => {
  const id = req.params.id;
  const updated = req.body;

  if (isValidObjectId(id)) {
    if (!utils.isObjctEmpty(updated)) {
      try {
        const updatedTicketCategorie = await TicketCategorie.findByIdAndUpdate(
          id,
          updated,
          {
            new: true,
          },
        ).catch((error) => next(error));

        if (updatedTicketCategorie) {
          res.json({
            message: 'Updated successful',
            data: updatedTicketCategorie,
            success: true,
            error: null,
          });
        } else {
          throw createError.NotFound("This Ticket categorie doesn't exist");
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

const createTicketCategorie = async (req, res, next) => {
  try {
    const result = await ticketCategorieRegSchema.validateAsync(req.body);

    const isExist = await TicketCategorie.findOne({
      brandName: result.brandName,
    }).catch((error) => next(error));

    if (isExist) {
      throw createError.Conflict('This Ticket categorie is already exist');
    }

    const newTicketCategorie = new TicketCategorie({ ...result });

    const savedTicketCategorie = await newTicketCategorie.save();

    res.json({
      message: `Created successful`,
      data: savedTicketCategorie,
      success: true,
      error: null,
    });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

const deleteTicketCategorie = async (req, res, next) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    try {
      const deletedTicketCategorie = await TicketCategorie.findByIdAndDelete(
        id,
      ).catch((error) => next(error));

      if (deletedTicketCategorie) {
        res.json({
          message: 'Deleted successful',
          data: deletedTicketCategorie,
          success: true,
          error: null,
        });
      } else {
        throw createError.NotFound("This Ticket categorie doesn't exist");
      }
    } catch (error) {
      next(error);
    }
  } else {
    next(createError.BadRequest('Invalid ID'));
  }
};

module.exports = {
  getAllTicketCategorie,
  getTicketCategorie,
  updateTicketCategorie,
  createTicketCategorie,
  deleteTicketCategorie,
};
