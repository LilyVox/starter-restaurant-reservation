const service = require('./reservations.service');
const asyncErrorHandler = require('../errors/asyncErrorHandler');
/**
 * List handler for reservation resources
 * @returns a list of reservations to the client
 */
async function list(req, res) {
  const data = await service.list();
  res.json(data);
}
/**
 * List handler for a specific date
 *
 */
async function listByDate(req, res) {
  const theDate = req.query.date;
  console.trace('date: ' + theDate);
  const data = await service.listByDate(theDate);
  console.trace('service returns: ' + data);
  res.status(200).json(data);
}
/**
 * @name reservations-controller
 * list()
 */
module.exports = {
  list: asyncErrorHandler(list),
  listByDate: asyncErrorHandler(listByDate),
};
