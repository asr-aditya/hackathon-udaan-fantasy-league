const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { intranetService } = require('../services');
const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  const tokenString = req.headers.authorization?.split('Bearer')?.[1]?.trim();
  const token = await intranetService.getAccessToken(tokenString);
  if (err || info || !user || !token) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;
  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt-without-slug', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(
        req,
        res,
        next
      );
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
