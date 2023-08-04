
const httpStatus = require('http-status');
const { Team } = require('../models');
const ApiError = require('../utils/ApiError');


const createTeam = async (teamBody) => {
  return Team.create(teamBody);
};

const queryTeams = async (filter, options) => {
  const teams = await Team.paginate(filter, options);
  return teams;
};

const getTeamById = async (id) => {
  return Team.findById(id);
};


const updateTeamById = async (teamId, updateBody) => {
  const team = await getTeamById(teamId);
  if (!team) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }
  Object.assign(team, updateBody);
  await team.save();
  return team;
};

const deleteTeamById = async (teamId) => {
  const team = await getTeamById(teamId);
  if (!team) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }
  await team.remove();
  return team;
};

module.exports = {
  createTeam,
  queryTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
};
