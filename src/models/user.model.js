const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { toJSON, paginate } = require('./plugins');
// const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    _id: Number,
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    rewardPoints: {
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
      default: [],
    },
    commits: {
      type: Number,
      default: 0,
    },
    badges: {
      type: [
        {
          type: String,
          ref: 'Badge',
        },
      ],
      default: [],
    },
    team: String,
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);
userSchema.plugin(AutoIncrement, { id: 'user_id' });
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
