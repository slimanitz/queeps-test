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
  postalCode: Joi.number().required(),
  forSell: Joi.boolean().required(),
  price: Joi.number().required(),
  agency: Joi.string().required(),

});

const create = async (asset) => {
  const { error, value } = schema.validate(asset);
  if (error) throw new APIError('Bad Payload', httpStatus.BAD_REQUEST);
  const newAsset = new Asset(value);
  await newAsset.save();
  return newAsset;
};

const get = async (id) => {
  const asset = await Asset.findById(id);
  if (!asset) throw new APIError('No asset found', httpStatus.NOT_FOUND);
  return asset;
};

const getAll = async () => {
  const assets = await Asset.find();
  return assets;
};

const update = async (id, payload) => {
  const { error, value } = schema.validate(payload);
  if (error) throw new APIError('Bad Payload', httpStatus.BAD_REQUEST);
  const updatedValue = await Asset.findByIdAndUpdate(id, value);
  if (!updatedValue) throw new APIError('Not Found', httpStatus.NOT_FOUND);
  return updatedValue;
};

const remove = async (id) => {
  const asset = await get(id);
  if (!asset) throw new APIError('No such asset', httpStatus.NOT_FOUND);
  await Asset.findByIdAndDelete(id);
};

module.exports.assetService = {
  create,
  get,
  getAll,
  update,
  remove,
};
