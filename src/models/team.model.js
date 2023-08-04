const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const teamSchema = mongoose.Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
    },
    members: {
      type: [
        {
          type: String,
          ref: 'User',
        },
      ],
    },
    rewardsPoints: {
      type: Number,
      default: 0,
    },
    challengesWon: {
      type: [
        {
          type: String,
          ref: 'Challenge',
        },
      ],
    },
    badges: {
      type: [
        {
          type: String,
          ref: 'Badge',
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
teamSchema.plugin(toJSON);
teamSchema.plugin(paginate);
teamSchema.plugin(AutoIncrement, { id: 'team_id' });
const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
