const Joi = require('joi');

const stageSchema = Joi.object().keys({
  stageName: Joi.string().required(),
  StageNumber: Joi.number().required(),
  allowedRole: Joi.number().required(),
});

const approvalConfigSchema = Joi.object().keys({
  name: Joi.string().required(),
  approvalType: Joi.string().required(),
  department: Joi.number().required(),
  maxAmount: Joi.number().integer().required(),
  stages: Joi.array().min(0).items(stageSchema),
});

const createApprovalConfig = {
  body: approvalConfigSchema,
};

module.exports = { createApprovalConfig };
