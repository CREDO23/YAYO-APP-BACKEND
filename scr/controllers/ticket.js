const createError = require('http-errors');
const { isValidObjectId } = require('mongoose');
const Ticket = require('../models/tickets');
const utils = require('../utils/index');
const { ticketRegSchema } = require('../utils/schemasValidator');

const getAllTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find().catch((error) => next(error));

    if (tickets == null || !tickets[0]) {
      next(createError.NotFound('There are not Tickets yet'));
    } else if (tickets) {
      res.json({ data: tickets, success: true });
    }
  } catch (error) {
    next(error);
  }
};

const getTicket = async (req, res, next) => {
  const id = req.params.id;

  if (isValidObjectId(id)) {
    try {
      const ticket = await Ticket.findById(id).catch((error) => next(error));

      if (ticket == null) {
        next(createError.NotFound("This Ticket doesn't exist"));
      } else if (ticket) {
        res.json({ data: ticket, success: true });
      }
    } catch (error) {
      next(error);
    }
  } else {
    next(createError.BadRequest('Invalid ID'));
  }
};

const updateTicket = async (req, res, next) => {
  const id = req.params.id;
  const updated = req.body;

  if (isValidObjectId(id)) {
    if (!utils.isObjctEmpty(updated)) {
      try {
        const updatedTicket = await Ticket.findByIdAndUpdate(id, updated, {
          new: true,
        }).catch((error) => next(error));

        if (updatedTicket) {
          res.json({
            message: 'Updated successful',
            data: updatedTicket,
            success: true,
          });
        } else {
          throw createError.NotFound("This Ticket doesn't exist");
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

const createTicket = async (req, res, next) => {
  try {
    const result = await ticketRegSchema.validateAsync(req.body);

    const newTicket = new Ticket({ ...result });

    const savedTicket = await newTicket.save();

    res.json({
      message: `Created successful`,
      data: savedTicket,
      success: true,
    });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

const deleteTicket = async (req, res, next) => {
  const id = req.params.id;
  if (isValidObjectId(id)) {
    try {
      const deletedTicket = await Ticket.findByIdAndDelete(id).catch((error) =>
        next(error),
      );

      if (deletedTicket) {
        res.json({
          message: 'Deleted successful',
          data: deletedTicket,
          success: true,
        });
      } else {
        throw createError.NotFound("This Ticket doesn't exist");
      }
    } catch (error) {
      next(error);
    }
  } else {
    next(createError.BadRequest('Invalid ID'));
  }
};

module.exports = {
  getAllTickets,
  getTicket,
  updateTicket,
  createTicket,
  deleteTicket,
};
