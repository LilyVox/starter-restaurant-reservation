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

async function preSeating(req, res, next) {
  const { table_id } = req.params;
  const { data } = req.body;
  if (!res.locals.reservation) return next({ status: 400, message: 'reservation not merged' });
  if (!table_id) return next({ status: 400, message: 'no table id?' });
  if (!data) return next({ status: 400, message: 'Body must include a data object' });
  let theTable = await service.read(table_id);
  if (res.locals.reservation.people >= theTable.capacity) {
    return next({
      status: 400,
      message: `Table ${theTable.table_name} cannot seat ${res.locals.reservation.people}`,
    });
  }
  res.locals.reservation_id = data.reservation_id;
  res.locals.table = theTable;
  next();
}
async function cleanUp(req, res, next) {
  const table_id = Number(req.params.table_id);
  if (!table_id) return next({ status: 400, message: 'no table to clean up' });
  let tables = await service.list();
  let table = tables.filter((aTable) => aTable.table_id === table_id)[0];
  console.log(table);
  if (!table) {
    return next({ status: 400, message: 'Table not found' });
  }
  if (table.status !== 'occupied') {
    return next({ status: 400, message: 'Table isnt occupied' });
  }
  res.locals.table_id = table_id;
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
  const { reservation_id, table } = res.locals;
  const data = await service.update(table.table_id, reservation_id);
  return res.status(200).json({ data });
}
async function unseatTable(req, res) {
  const { table_id } = res.locals;
  let data = await service.delete(table_id);
  return res.sendStatus(204);
}
async function readTable(req, res) {
  const table_id = Number(req.params.table_id);
  let data = await service.read(table_id);
  return res.status(200).json({ data });
}

module.exports = {
  list: [asyncErrorHandler(list)],
  create: [verifyTableData, asyncErrorHandler(createTable)],
  update: [preSeating, asyncErrorHandler(seatTable)],
  delete: [asyncErrorHandler(cleanUp), asyncErrorHandler(unseatTable)],
  read: [asyncErrorHandler(readTable)]
};
