// const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
// const config = require('./config');
// const { tokenTypes } = require('./tokens');
// const { User } = require('../models');
// const { intranetService } = require('../services');

// const jwtOptions = {
//   secretOrKey: config.jwt.secret,
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// };

// const jwtVerify = async (payload, done) => {
//   try {
//     if (payload.type !== tokenTypes.ACCESS) {
//       throw new Error('Invalid token type');
//     }
//     const user = await intranetService.getUserByFilter({ _id: payload.sub, financeAppRights: true });
//     if (!user) {
//       return done(null, false);
//     }
//     const { name, email, role, id, userRights, additionalRoles } = user;
//     const userPayload = { name, email, role, id: parseInt(id), _id: parseInt(id), userRights, additionalRoles };
//     done(null, userPayload);
//   } catch (error) {
//     done(error, false);
//   }
// };

// const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

// module.exports = {
//   jwtStrategy,
// };
