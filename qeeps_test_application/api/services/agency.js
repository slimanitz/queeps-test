const httpStatus = require('http-status');
const Joi = require('joi');
const { ObjectId } = require('mongoose').Types;
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
  if (error) throw new APIError({ message: 'Bad Payload', status: httpStatus.BAD_REQUEST });
  const newAgency = new Agency(value);
  await newAgency.save();
  return newAgency;
};

const get = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new APIError({ message: 'No agency found', status: httpStatus.NOT_FOUND });
  }
  const agency = await Agency.findById(id);
  if (!agency) throw new APIError({ message: 'No agency found', status: httpStatus.NOT_FOUND });
  return agency;
};

const getAll = async () => {
  const agencies = await Agency.find();
  return agencies;
};

const update = async (id, payload) => {
  const { error } = schema.validate(payload);
  if (error) throw new APIError({ message: 'Bad Payload', status: httpStatus.BAD_REQUEST });
  const updatedValue = await Agency.findByIdAndUpdate(id, payload, { new: true });
  if (!updatedValue) throw new APIError({ message: 'No agency found', status: httpStatus.NOT_FOUND });
  return updatedValue;
};

const remove = async (id) => {
  await get(id);
  await Agency.findByIdAndDelete(id);
};

module.exports.agencyService = {
  create,
  get,
  getAll,
  update,
  remove,
};
