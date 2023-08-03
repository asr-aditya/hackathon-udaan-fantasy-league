const Joi = require('joi');

const categorySchema = Joi.object().keys({
  name: Joi.string().required(),
  categoryType: Joi.string().required(),
  capex: Joi.bool().required(),
  bannedItems: Joi.array().items(Joi.number()).min(0),
});

const createCategory = {
  body: categorySchema,
};

const getCategorys = {
  query: Joi.object().keys({
    name: Joi.string(),
    _id: Joi.number().integer(),
    categoryType: Joi.string(),
    capex: Joi.bool(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    name: Joi.string().allow(''),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.number().integer(),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.number().integer(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      categoryType: Joi.string(),
      capex: Joi.bool(),
      bannedItems: Joi.array().items(Joi.number()).min(0),
      archive: Joi.bool(),
    })
    .min(1),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.number().integer(),
  }),
};

const categoryListValidation = {
  query: Joi.object().keys({
    name: Joi.string(),
  }),
};

module.exports = {
  createCategory,
  getCategorys,
  getCategory,
  updateCategory,
  deleteCategory,
  categoryListValidation,
};
