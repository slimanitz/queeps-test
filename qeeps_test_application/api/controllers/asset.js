const httpStatus = require('http-status');
const { assetService } = require('../services/asset');

const create = async (req, res) => {
  const { agency } = req.user;
  const newasset = await assetService.create(req.body, agency);
  res.status(httpStatus.OK).json(newasset);
};

const getAll = async (req, res) => {
  const { agency } = req.user;
  const assets = await assetService.getAll(agency);
  res.status(httpStatus.OK).json(assets);
};

const get = async (req, res) => {
  const { id } = req.params;
  const { agency } = req.user;
  const asset = await assetService.get(id, agency);
  res.status(httpStatus.OK).json(asset);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { agency } = req.user;
  const asset = await assetService.update(id, req.body, agency);
  res.status(httpStatus.OK).json(asset);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { agency } = req.user;
  const asset = await assetService.remove(id, req.body, agency);
  res.status(httpStatus.OK).json(asset);
};

module.exports = {
  create,
  get,
  getAll,
  update,
  remove,
};
