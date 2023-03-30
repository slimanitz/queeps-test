const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const mongoClient = require('../../config/database');

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
    name: { type: String },
    agency: { type: mongoose.Types.ObjectId },

  },
  { timestamps: true },
);

const User = mongoose.model('user', userSchema);

module.exports = User;
