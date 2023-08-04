const Joi = require('joi');

const createChallenge = {
  body: Joi.object().keys({}),
};

const getChallenges = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getChallenge = {};

const updateChallenge = {};

const deleteChallenge = {};

module.exports = {
  createChallenge,
  getChallenges,
  getChallenge,
  updateChallenge,
  deleteChallenge,
};
