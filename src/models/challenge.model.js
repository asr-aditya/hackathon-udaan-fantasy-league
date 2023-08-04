const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { types } = require('joi');
const { challengeTypes } = require('../config/challengeTypes');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const challengeSchema = mongoose.Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: challengeTypes,
    },
    bettings: {
      type: [
        {
          team: String,
          users: {
            type: [String],
            default: [],
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
challengeSchema.plugin(toJSON);
challengeSchema.plugin(paginate);
challengeSchema.plugin(AutoIncrement, { id: 'challenge_id' });
const Challenge = mongoose.model('Challenge', challengeSchema);
module.exports = Challenge;
