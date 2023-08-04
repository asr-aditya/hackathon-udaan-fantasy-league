const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const challengeValidation = require('../../validations/challenge.validation');
const challengeController = require('../../controllers/challenge.controller');

const router = express.Router();

router
  .route('/')
  .post(challengeController.createChallenge)
  .get(validate(challengeValidation.getChallenges), challengeController.getChallenges);

router
  .route('/:challengeId')
  .get(validate(challengeValidation.getChallenge), challengeController.getChallenge)
  .patch(validate(challengeValidation.updateChallenge), challengeController.updateChallenge)
  .delete(validate(challengeValidation.deleteChallenge), challengeController.deleteChallenge);

router.route('/placeBet').post(challengeController.placeBet);

module.exports = router;
