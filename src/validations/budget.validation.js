const Joi = require('joi');

const budgetSchema = Joi.object().keys({
  site: Joi.number().required(),
  category: Joi.number().required(),
  lineItems: Joi.array().items(Joi.number()).min(0),
  createdBy: Joi.number().required(),
});

const createBudget = {
  body: budgetSchema,
};

const updateBudgetById = {
  params: {
    id: Joi.number().required(),
  },
  query: {
    override: Joi.boolean().default(false),
  },
  body: Joi.object(),
};

const queryBudgets = {
  query: {
    sortBy: Joi.string().allow(''),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    _id: Joi.number().integer(),
    category: Joi.string().allow(''),
    site: Joi.number().integer(),
    status: Joi.string().allow(''),
    name: Joi.string().allow(''),
    budgetType: Joi.string().allow(''),
    siteCode: Joi.string().allow(''),
    searchKey:Joi.string().allow(''),
  },
};

const uploadBudget = {
  query: {
    name: Joi.string().required(),
    site: Joi.number().integer(),
    category: Joi.number().integer(),
  },
  body: Joi.any(),
};

const lineItemValidation = Joi.object().keys({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  category: Joi.number().required(),
});

const approvalBudgetValidation = Joi.object().keys({
  site: Joi.number().required(),
  name: Joi.string().required(),
  lineItems: Joi.array().required().min(1).items(lineItemValidation),
  siteCode: Joi.number().required(),
  budgetType: Joi.string().default('capex_budget')
});

const approvalBudgets = {
  body: Joi.array().items(approvalBudgetValidation),
};

module.exports = { createBudget, updateBudgetById, queryBudgets, uploadBudget, approvalBudgets };
