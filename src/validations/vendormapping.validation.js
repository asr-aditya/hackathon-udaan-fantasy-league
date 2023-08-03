const Joi = require('joi');

const createVendormapping = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    vendorCode: Joi.string().required(),
    item: Joi.number().integer().required(),
    price: Joi.number().integer().required(),
  }),
};

const getVendormappings = {
  query: Joi.object().keys({
    name: Joi.string().allow(''),
    item: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getVendormapping = {
  params: Joi.object().keys({
    vendormappingId: Joi.number().integer(),
  }),
};

const updateVendormapping = {
  params: Joi.object().keys({
    vendormappingId: Joi.number().integer(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      item: Joi.number().integer(),
      price: Joi.number().integer(),
    })
    .min(1),
};

const deleteVendormapping = {
  params: Joi.object().keys({
    vendormappingId: Joi.number().integer(),
  }),
};

module.exports = {
  createVendormapping,
  getVendormappings,
  getVendormapping,
  updateVendormapping,
  deleteVendormapping,
};
