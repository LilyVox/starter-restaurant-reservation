const methodNotAllowed = require('../errors/methodNotAllowed');
const router = require('express').Router({ mergeParams: true });
const controller = require('./reservations.controller');
/**
 * Defines the router for reservation resources.
 * @type {Router}
 */
router.route('/:reservation_id').get(controller.read).all(methodNotAllowed);
router.route('/:reservation_id/status').put(controller.statusUpdate).all(methodNotAllowed);
router.route('/').get(controller.list).post(controller.create).all(methodNotAllowed);
module.exports = router;
