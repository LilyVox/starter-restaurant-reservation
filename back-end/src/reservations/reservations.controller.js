const service = require('./reservations.service');
const asyncErrorHandler = require('../errors/asyncErrorHandler');
/**
 * List handler for reservation resources
 * @returns a list of reservations to the client
 */
function verifyDateFormat(req, res, next) {
  if (req.query?.date) {
    let { date } = req.query;
    console.info(`date captured is ${date} type ${typeof date}`);
    if (typeof date === 'string' && date.match(/(^\d{4}\-\d{2}\-\d{2})/)) {
      res.locals.date = date;
      return next();
    } else next({ status: 400, message: 'Invalid date format.' });
  } else {
    next();
  }
}
async function list(req, res, next) {
  if (res.locals.date) next();
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
  const theDate = res.locals.date;
  console.info('res.locals.date in listByDate: ' + theDate);
  const data = await service.listByDate(theDate);
  res.status(200).json(data);
}

module.exports = {
  list: [verifyDateFormat, asyncErrorHandler(list), asyncErrorHandler(listByDate)],
};
