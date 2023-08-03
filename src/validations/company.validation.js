const Joi = require('joi');

const companySchema = Joi.object().keys({
  name: Joi.string().required(),
  parent: Joi.number(),
  archived: Joi.boolean(),
  gstin: Joi.string(),
});

const createCompany = {
  body: companySchema,
};

const updateCompanyById = {
  params: {
    companyId: Joi.number().required(),
  },
  body: companySchema.min(1),
};

const queryCompanies = {
  query: {
    _id: Joi.number().integer(),
    name: Joi.string().allow(''),
    gstin: Joi.string().allow(''),
    parent: Joi.number().integer(),
    sortBy: Joi.string().allow(''),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  },
};

module.exports = { createCompany, queryCompanies, updateCompanyById };
