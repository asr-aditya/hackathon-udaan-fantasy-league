const Joi = require('joi');

const createSubcategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.number().integer().required(),
    bannedItems: Joi.array().items(Joi.number()).min(0),
  }),
};

const getSubcategorys = {
  query: Joi.object().keys({
    name: Joi.string().allow(""),
    _id: Joi.number().integer(),
    category: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getSubcategory = {
  params: Joi.object().keys({
    subcategoryId: Joi.number().integer(),
  }),
};

const updateSubcategory = {
  params: Joi.object().keys({
    subcategoryId: Joi.number().integer(),
  }),
  body: Joi.object().keys({}).min(1),
};

const deleteSubcategory = {
  params: Joi.object().keys({
    subcategoryId: Joi.number().integer(),
  }),
};

module.exports = {
  createSubcategory,
  getSubcategorys,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
