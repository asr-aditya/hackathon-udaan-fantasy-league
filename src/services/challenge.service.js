const httpStatus = require('http-status');
const { Challenge } = require('../models');
const ApiError = require('../utils/ApiError');

const createChallenge = async (challengeBody) => {
  return Challenge.create(challengeBody);
};

const findOneChallenge = async (filter, options) => {
  const challenges = await Challenge.findOne(filter, options);
  return challenges;
};

const getChallengeById = async (id) => {
  return Challenge.findById(id);
};

const updateChallengeById = async (challengeId, updateBody) => {
  const challenge = await getChallengeById(challengeId);
  if (!challenge) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Challenge not found');
  }
  Object.assign(challenge, updateBody);
  await challenge.save();
  return challenge;
};

const deleteChallengeById = async (challengeId) => {
  const challenge = await getChallengeById(challengeId);
  if (!challenge) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Challenge not found');
  }
  await challenge.remove();
  return challenge;
};

module.exports = {
  createChallenge,
  findOneChallenge,
  getChallengeById,
  updateChallengeById,
  deleteChallengeById,
};
