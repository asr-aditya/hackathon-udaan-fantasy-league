const Joi = require('joi');

const grnSchema = Joi.object().keys({
  purchaseOrderId: Joi.number().required(),
  vendorCode: Joi.string().required(),
  receivedItems: Joi.array().items(
    Joi.object().keys({
      poItemId: Joi.string().required(),
      receivedQuantity: Joi.number().min(0).required(),
    })
  ),
  inwardAccepted: Joi.bool().default(true),
});

const createGRN = {
  body: grnSchema,
};

const updateGRNById = {
  params: {
    id: Joi.number().required(),
  },
  body: grnSchema,
};

const queryGRNs = {
  query: {
    _id: Joi.string(),
    purchaseOrderId: Joi.number(),
    vendorCode: Joi.string(),
    status: Joi.string(),
    paymentStatus: Joi.string(),
    sortBy: Joi.string().allow(''),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  },
};

module.exports = { createGRN, queryGRNs, updateGRNById };
