const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const mongoClient = require('../../config/database');

const assetSchema = new mongoose.Schema(
  {
    surface: { type: Number },
    nbRooms: { type: Number },
    buildYear: { type: Number },
    address: { type: String },
    city: { type: String },
    postalCode: { type: String },
    forSell: { type: Boolean },
    price: { type: Number },
    agency: { type: mongoose.Schema.Types.ObjectId, ref: 'agency' },

  },
  { versionKey: false },
);

const Asset = mongoose.model('asset', assetSchema);

module.exports = Asset;
