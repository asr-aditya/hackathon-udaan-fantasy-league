const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { challengeService } = require('../services');

const createChallenge = catchAsync(async (req, res) => {
  const challenge = await challengeService.createChallenge(req.body);
  res.status(httpStatus.CREATED).send(challenge);
});

const getChallenges = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await challengeService.findOneChallenge(filter, options);
  res.send(result);
});

const getChallenge = catchAsync(async (req, res) => {
  const challenge = await challengeService.getChallengeById(req.params.challengeId);
  if (!challenge) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Challenge not found');
  }
  res.send(challenge);
});

const updateChallenge = catchAsync(async (req, res) => {
  const challenge = await challengeService.updateChallengeById(req.params.challengeId, req.body);
  res.send(challenge);
});

const deleteChallenge = catchAsync(async (req, res) => {
  await challengeService.deleteChallengeById(req.params.challengeId);
  res.status(httpStatus.NO_CONTENT).send();
});

const placeBet = catchAsync(async (req, res) => {
  const { team, user, challenge } = req.query;
  // res.send(`${team}:  ${user}: ${challenge}`);
  const challengeObj = await challengeService.findOneChallenge({ name: challenge });
  var betPlaced = false;
  challengeObj.bettings.forEach((element) => {
    if (element.team == team) {
      if (element.users.includes(user)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Kitna satta lagaega -_-');
      } else {
        element.users.push(user);
        betPlaced = true;
      }
    }
  });
  if (!betPlaced) {
    challengeObj.bettings.push({
      team: team,
      users: [user],
    });
  }
  const updated = await challengeService.updateChallengeById(challengeObj._id, { ...challengeObj });
  res.status(httpStatus.CREATED).send();
});

module.exports = {
  createChallenge,
  getChallenges,
  getChallenge,
  updateChallenge,
  deleteChallenge,
  placeBet,
};
