// const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
// const config = require('./config');
// const { tokenTypes } = require('./tokens');
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
//     let user = await intranetService.getUserByFilter({_id:payload.sub}, { noSlug: true });
//     if (!user) {
//       return done(null, false);
//     }
//     done(null, user);
//   } catch (error) {
//     done(error, false);
//   }
// };

// const jwtStrategyWithoutSlug = new JwtStrategy(jwtOptions, jwtVerify);

// module.exports = {
//   jwtStrategyWithoutSlug,
// };
