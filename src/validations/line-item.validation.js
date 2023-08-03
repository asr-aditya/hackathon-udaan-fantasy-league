const Joi = require('joi');

const lineItemSchema = Joi.object().keys({
  name: Joi.string().required(),
  budgetId: Joi.number().required(),
  quantity: Joi.number(),
  price: Joi.number(),
  specification: Joi.string(),
  createdBy: Joi.number().required(),
});

const createLineItem = {
  body: lineItemSchema,
};

const createLineItems = {
  body: {
    lineItems: [lineItemSchema],
  },
};

const queryLineItems = {
  query: {
    sortBy: Joi.string().allow(''),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  },
};

const queryPriceHistory = {
  query: {
    status: Joi.string(),
    sortBy: Joi.string().allow(''),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  },
};

const updateLineItemById = {
  params: {
    id: Joi.number().required(),
  },
  body: Joi.object().keys({
    updatedAmount: Joi.number().integer(),
  }),
};

module.exports = { createLineItem, queryLineItems, updateLineItemById, createLineItems, queryPriceHistory };
