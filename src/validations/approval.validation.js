const Joi = require('joi');

const approvalSchema = Joi.object().keys({
  site: Joi.number().required(),
  approvalType: Joi.string().required(),
  stages: Joi.array().min(0).items(Joi.number()),
});

const createApproval = {
  body: approvalSchema,
};

const updateApprovalById = {
  params: {
    id: Joi.number().required(),
  },
  body: approvalSchema,
};

const queryApprovals = {
  query: {
    _id: Joi.number().integer(),
    documentId: Joi.string().allow(''),
    approvalType: Joi.string().allow(''),
    archive: Joi.boolean().default(false),
    sortBy: Joi.string().allow(''),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  },
};

const findByRoles = {
  query: {
    category: Joi.string().allow(''),
    approvalType: Joi.string().allow(''),
    site: Joi.number().integer(),
    status: Joi.string().allow(''),
    approved: Joi.boolean(),
    rejected: Joi.boolean(),
    name: Joi.string().allow(''),
  },
};

const rejectApproval = {
  query: {
    id: Joi.number().integer(),
    comment: Joi.string(),
  },
};

const approveItem = {
  params: {
    id: Joi.number().required(),
  },
};

module.exports = { createApproval, updateApprovalById, queryApprovals, approveItem, rejectApproval, findByRoles };
