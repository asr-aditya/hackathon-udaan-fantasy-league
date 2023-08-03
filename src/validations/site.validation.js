const Joi = require('joi');

const siteSchema = Joi.object().keys({
  name: Joi.string().required(),
  company: Joi.number().required(),
  managedBy: Joi.string(),
  allowedCategories: Joi.array().items(Joi.number()),
});

const createSite = {
  body: siteSchema,
};

const updateSiteById = {
  params: {
    id: Joi.number().required(),
  },
  body: siteSchema,
};

const querySites = {
  query: {
    sortBy: Joi.string().allow(''),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  },
};

module.exports = { createSite, querySites, updateSiteById };
