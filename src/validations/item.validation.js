const Joi = require('joi');

const createItem = {
  body: Joi.object().keys({
    itemCode: Joi.string().required(),
    name: Joi.string().required(),
    category: Joi.number().integer().required(),
    subCategory: Joi.number().integer().required(),
    price: Joi.number().integer().required(),
    taxPercentage: Joi.number().integer().required(),
    specification: Joi.string().allow(''),
  }),
};

const getItems = {
  query: Joi.object().keys({
    name: Joi.string(),
    _id: Joi.number().integer(),
    archive: Joi.bool().optional(),
    category: Joi.number().integer(),
    subCategory: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
const getItemsByVendor = {
  query: Joi.object().keys({
    vendorCode: Joi.string().required(),
    name: Joi.string(),
    _id: Joi.number().integer(),
    archive: Joi.bool().optional(),
    category: Joi.number().integer(),
    subCategory: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getItem = {
  params: Joi.object().keys({
    itemId: Joi.number().integer(),
  }),
};

const updateItem = {
  params: Joi.object().keys({
    itemId: Joi.number().integer(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      price: Joi.number().integer(),
      specification: Joi.string().allow(''),
      itemCode: Joi.string().allow(''),
      taxPercentage: Joi.number().integer(),
      category: Joi.number().integer(),
      subCategory: Joi.number().integer(),
    })
    .min(1),
};

const deleteItem = {
  params: Joi.object().keys({
    itemId: Joi.number().integer(),
  }),
};

module.exports = {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  getItemsByVendor,
};
