const httpStatus = require('http-status');
const Joi = require('joi');
const Agency = require('../models/agency');
const APIError = require('../../utils/api-error');

const schema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  postalCode: Joi.string().required(),
  website: Joi.string(),
});

const create = async (agency) => {
  const { error, value } = schema.validate(agency);
  if (error) throw new APIError('Bad Payload', httpStatus.BAD_REQUEST);
  const newAgency = new Agency(value);
  await newAgency.save();
  return newAgency;
};

const get = async (id) => {
  const agency = await Agency.findById(id);
  if (!agency) throw new APIError('No agency found', httpStatus.NOT_FOUND);
  return agency;
};

const getAll = async () => {
  const agencies = await Agency.find();
  return agencies;
};

const update = async (id, payload) => {
  const { error } = schema.validate(payload);
  if (error) throw new APIError('Bad Payload', httpStatus.BAD_REQUEST);
  const updatedValue = await Agency.findByIdAndUpdate(id, payload, { new: true });
  if (!updatedValue) throw new APIError('Not Found', httpStatus.NOT_FOUND);
  return updatedValue;
};

const remove = async (id) => {
  const agency = await get(id);
  if (!agency) throw new APIError('No such agency', httpStatus.NOT_FOUND);
  await Agency.findByIdAndDelete(id);
};

module.exports.agencyService = {
  create,
  get,
  getAll,
  update,
  remove,
};
