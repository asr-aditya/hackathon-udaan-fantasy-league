const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const teamValidation = require('../../validations/team.validation');
const teamController = require('../../controllers/team.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(teamValidation.createTeam), teamController.createTeam)
  .get(validate(teamValidation.getTeams), teamController.getTeams);

router
  .route('/:teamId')
  .get(validate(teamValidation.getTeam), teamController.getTeam)
  .patch(validate(teamValidation.updateTeam), teamController.updateTeam)
  .delete(validate(teamValidation.deleteTeam), teamController.deleteTeam);

module.exports = router;
