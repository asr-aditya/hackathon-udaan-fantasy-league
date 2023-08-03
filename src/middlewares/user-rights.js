const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const checkUserRights = (right) => async (req, _, next) => {
  const userRights = req?.user?.userRights || {};
  const [entity, entityRight] = right?.split?.('.') || [];
  if (!userRights?.[entity]?.[entityRight]) {
    next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    return;
  }
  next();
};

module.exports = checkUserRights;
