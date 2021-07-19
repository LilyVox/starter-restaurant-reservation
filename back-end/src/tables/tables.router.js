const methodNotAllowed = require('../errors/methodNotAllowed');
const router = require('express').Router();
const controller = require('./tables.controller');
/**
 * Defines the router for the tables resources.
 * @type {Router}
 *
 */
router.route('/:table_id/seat').put(controller.update).delete(controller.delete)
router.route('/').get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router;
