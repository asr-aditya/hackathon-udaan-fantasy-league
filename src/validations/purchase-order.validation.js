const Joi = require('joi');

const itemObject = Joi.object().keys({
  lineItem: Joi.number().required(),
  item: Joi.number().required(),
  uom: Joi.string().required(),
  quantity: Joi.number().required(),
  rate: Joi.number().required(),
  amount: Joi.number().required(),
  taxRate: Joi.number().required(),
  taxAmount: Joi.number().required(),
  totalAmount: Joi.number().required(),
  description: Joi.string(),
});

const purchaseOrderSchema = Joi.object().keys({
  company: Joi.number().required(),
  department: Joi.number().required(),
  site: Joi.number().required(),
  vendorCode: Joi.string().required(),
  poType: Joi.string().required(),
  name: Joi.string().required(),
  budget: Joi.number().required(),
  poDate: Joi.date(),
  agreement: Joi.string(),
  expiry: Joi.date(),
  remarks: Joi.string(),
  paymentTerms: Joi.string(),
  currency: Joi.string(),
  projectLocationId: Joi.number(),
  deliveryLocationId: Joi.number(),
  billingLocationId: Joi.number(),
  advance: Joi.object().keys({
    advancePercentage: Joi.number(),
    advanceAmount: Joi.number(),
  }),
  forex: Joi.number(),
  items: Joi.array().items(itemObject),
});

const createPurchaseOrder = {
  body: purchaseOrderSchema,
};

const queryPurchaseOrders = {
  query: {
    _id: Joi.number(),
    company: Joi.number(),
    site: Joi.number(),
    vendorCode: Joi.string(),
    poType: Joi.string(),
    name: Joi.string(),
    budget: Joi.number(),
    status: Joi.string().allow(''),
    sortBy: Joi.string().allow(''),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    name: Joi.string().allow(''),
  },
};

const uploadPoDoc = {
  params: {
    poId: Joi.number().required(),
  },
};

module.exports = { createPurchaseOrder, queryPurchaseOrders, uploadPoDoc };
