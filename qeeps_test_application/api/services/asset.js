const httpStatus = require('http-status');
const Joi = require('joi');
const Asset = require('../models/asset');
const APIError = require('../../utils/api-error');

const schema = Joi.object({
  surface: Joi.number().required(),
  nbRooms: Joi.number().required(),
  buildYear: Joi.number().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  postalCode: Joi.string().required(),
  forSell: Joi.boolean().required(),
  price: Joi.number().required(),
});

const create = async (asset, agency) => {
  const { error, value } = schema.validate(asset);
  if (error) throw new APIError({ message: 'Bad Payload', status: httpStatus.BAD_REQUEST });
  value.agency = agency;
  const newAsset = new Asset(value);
  await newAsset.save();
  return newAsset;
};

const get = async (id, agency) => {
  const asset = await Asset.findOne({ _id: id, agency });
  if (!asset) throw new APIError({ message: 'No asset found', status: httpStatus.NOT_FOUND });
  return asset;
};

const getAll = async (agency) => {
  const assets = await Asset.find({ agency });
  return assets;
};

const update = async (id, payload, agency) => {
  const { error, value } = schema.validate(payload);
  if (error) throw new APIError({ message: 'Bad Payload', status: httpStatus.BAD_REQUEST });
  const updatedValue = await Asset
    .findOneAndUpdate({ _id: id, agency }, value, { new: true });
  if (!updatedValue) throw new APIError({ message: 'Not Found', status: httpStatus.NOT_FOUND });
  return updatedValue;
};

const remove = async (id, agency) => {
  const asset = await get(id, agency);
  if (!asset) throw new APIError('No such asset', httpStatus.NOT_FOUND);
  await Asset.findOneAndDelete({ _id: id, agency });
};

module.exports.assetService = {
  create,
  get,
  getAll,
  update,
  remove,
};
