const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

const throwAxiosError = (message, error, throwError = false, code) => {

  const response = error?.response || {};
  const { request, ...errorObject } = response;
  logger.info(`${message} ${errorObject?.data?.message}`);
  if (throwError) {
    throw new ApiError(code, errorObject?.data?.message);
  }
};

module.exports = {
  throwAxiosError,
};
