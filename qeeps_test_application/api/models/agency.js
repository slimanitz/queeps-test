const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const mongoClient = require('../../config/database');

const agencySchema = new mongoose.Schema(
  {
    name: { type: String },
    address: { type: String },
    city: { type: String },
    postalCode: { type: String },
    website: { type: String },

  },
  { versionKey: false },
);

const Agency = mongoose.model('agency', agencySchema);

module.exports = Agency;
