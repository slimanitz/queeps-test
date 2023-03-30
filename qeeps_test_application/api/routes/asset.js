const express = require('express');
const {
  create, get, getAll, update, remove,
} = require('../controllers/asset');
const authenticateJWT = require('../../middlewares/auth');

const router = express.Router();

router.use(authenticateJWT);
router.post('/', create);
router.get('/:id', get);
router.get('/', getAll);
router.patch('/:id', update);
router.delete('/:id', remove);

module.exports = router;
