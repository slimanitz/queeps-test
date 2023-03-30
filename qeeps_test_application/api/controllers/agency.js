const httpStatus = require('http-status');
const { agencyService } = require('../services/agency');

const create = async (req, res) => {
  const newagency = await agencyService.create(req.body);
  res.status(httpStatus.OK).json(newagency);
};

const getAll = async (req, res) => {
  const agencies = await agencyService.getAll();
  res.status(httpStatus.OK).json(agencies);
};

const get = async (req, res) => {
  const { id } = req.params;
  const agency = await agencyService.get(id);
  res.status(httpStatus.OK).json(agency);
};

const update = async (req, res) => {
  const { id } = req.params;
  const agency = await agencyService.update(id, req.body);
  res.status(httpStatus.OK).json(agency);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const agency = await agencyService.remove(id, req.body);
  res.status(httpStatus.OK).json(agency);
};

module.exports = {
  create,
  get,
  getAll,
  update,
  remove,
};
