const service = require('./reservations.service');
const asyncErrorHandler = require('../errors/asyncErrorHandler');
/**
 * List handler for reservation resources
 * @returns a list of reservations to the client
 */
async function list(req, res) {
  if (req.query?.date) listByDate(req, res);
  else {
    const data = await service.list();
    res.json(data);
  }
}
/**
 * List handler for a specific date
 * is called in @list() if a query is found
 */
async function listByDate(req, res) {
  const theDate = req.query.date;
  console.info('date: ' + theDate);
  const data = await service.listByDate(theDate);
  res.status(200).json(data);
}

module.exports = {
  list: asyncErrorHandler(list),
  listByDate: asyncErrorHandler(listByDate),
};
