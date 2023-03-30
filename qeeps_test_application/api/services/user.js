const httpStatus = require('http-status');
const Joi = require('joi');
const crypto = require('crypto');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const APIError = require('../../utils/api-error');
const { jwtSecret } = require('../../config/vars');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  agency: Joi.string().required(),

});

const create = async (user) => {
  const { error, value } = schema.validate(user);
  if (error) throw new APIError({ message: 'Bad Payload', status: httpStatus.BAD_REQUEST });
  value.password = crypto.createHash('sha1').update(value.password, 'binary').digest('hex');
  const newUser = new User(value);
  await newUser.save();
  return newUser;
};

const login = async ({ email, password }) => {
  const hashpassword = crypto.createHash('sha1').update(password, 'binary').digest('hex');
  const user = await User.findOne({ email, password: hashpassword });
  if (!user) throw new APIError({ message: 'Wrong credentials', status: httpStatus.UNAUTHORIZED });
  const token = jwt.sign({ user }, jwtSecret);
  return token;
};

const get = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new APIError({ message: 'No user found', status: httpStatus.NOT_FOUND });
  return user;
};

const getAll = async () => {
  const users = await User.find();
  return users;
};

const update = async (id, payload) => {
  const { error, value } = schema.validate(payload);
  if (error) throw new APIError({ message: 'Bad Payload', status: httpStatus.BAD_REQUEST });
  const updatedValue = await User.findByIdAndUpdate(id, value, { new: true });
  if (!updatedValue) throw new APIError({ message: 'Not Found', status: httpStatus.NOT_FOUND });
  return updatedValue;
};

const remove = async (id) => {
  const user = await get(id);
  if (!user) throw new APIError('No such user', httpStatus.NOT_FOUND);
  await User.findByIdAndDelete(id);
};

module.exports.userService = {
  create,
  get,
  getAll,
  update,
  remove,
  login,
};
