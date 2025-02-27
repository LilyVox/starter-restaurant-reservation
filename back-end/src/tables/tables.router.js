const methodNotAllowed = require('../errors/methodNotAllowed');
const router = require('express').Router();
const controller = require('./tables.controller');
const reservationsController = require('../reservations/reservations.controller');
/**
 * Defines the router for the tables resources.
 * @type {Router}
 *
 */
router
  .route('/:table_id/seat')
  .put(reservationsController.isValidID, controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);
router.route('/:table_id').get(controller.read).all(methodNotAllowed);
router.route('/').get(controller.list).post(controller.create).all(methodNotAllowed);

module.exports = router;
