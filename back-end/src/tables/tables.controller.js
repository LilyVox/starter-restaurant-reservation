const service = require('./tables.service');
const asyncErrorHandler = require('../errors/asyncErrorHandler');

function verifyTableData(req, res, next) {
  let { data } = req.body;
  if (!data) return next({ status: 400, message: 'Body must include a data object' });
  const neededFields = ['table_name', 'capacity'];
  for (let field of neededFields) {
    if (!data.hasOwnProperty(field) || data[field] === '') {
      return next({ status: 400, message: `Field required: ${field}` });
    }
  }
  if (typeof data.capacity !== 'number')
    return next({ status: 400, message: 'capacity field must be a number' });
  if (data.capacity < 1) return next({ status: 400, message: 'capacity field must be at least 1' });
  res.locals.table = { table_name: data.table_name, capacity: data.capacity, status: free };
  next();
}

function preSeating(req, res, next) {
  const { table_id } = req.params;
  const { data } = req.body;
  if (!table_id) return next({ status: 400, message: 'no table id?' });
  if (!data) return next({ status: 400, message: 'Body must include a data object' });
  if (!data.reservation_id)
    return next({ status: 400, message: 'data must include a reservation_id' });
  res.locals.reservation_id = data.reservation_id;
  res.locals.table_id = table_id;
  next();
}
async function cleanUp(req, res, next) {
  const { table_id } = req.params;
  if (!table_id) return next({ status: 400, message: 'no table to clean up' });
  let table = await service
    .list()
    .then((data) => data.filter((aTable) => aTable.table_id === table_id));
  console.log(table);
  if (!table || table?.status !== 'occupied') return next({ status: 400, message: 'Table isnt occupied' });
  if (table) res.locals.table_id = table_id;
  next();
}

/**
 * List handler for tables resources
 * @returns a list of tables to the client
 */
async function list(req, res, next) {
  const data = await service.list();
  res.status(200).json({ data });
  return;
}

/**
 * Posts to DB a new table
 * after field verification
 */
async function createTable(req, res) {
  const returning = await service.create(res.locals.table);
  res.status(201).json({ data: returning[0] });
}

/**
 * Seats a table with a provided reservation
 */
async function seatTable(req, res) {
  const { reservation_id, table_id } = res.locals;
  const data = await service.update(table_id, reservation_id);
  return res.status(200).json({ data });
}
async function unseatTable(req, res) {
  const { table_id } = res.locals;
  await service.update(table_id);
  return res.status(204);
}

module.exports = {
  list: [asyncErrorHandler(list)],
  create: [verifyTableData, asyncErrorHandler(createTable)],
  update: [preSeating, asyncErrorHandler(seatTable)],
  delete: [asyncErrorHandler(cleanUp), asyncErrorHandler(unseatTable)],
};
