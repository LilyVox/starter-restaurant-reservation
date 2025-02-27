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
  if (data.table_name.length < 2)
    return next({ status: 400, message: 'table_name must be 2 or more characters' });
  let status = data.reservation_id ? 'occupied' : 'free';
  res.locals.table = { ...data, status: status };

  next();
}
async function verifyTableId(req, res, next) {
  const table_id = Number(req.params.table_id);
  if (!table_id || Number.isNaN(table_id))
    return next({ status: 400, message: 'Missing table ID' });
  res.locals.table_id = table_id;
  let data = await service.read(res.locals.table_id);
  if (!data) return next({ status: 404, message: `table ${table_id} not found` });
  res.locals.table = data;
  next();
}
async function preSeating(req, res, next) {
  const { table_id } = req.params;
  const { data } = req.body;
  if (!res.locals.reservation)
    return next({ status: 404, message: `reservation ${res.locals.reservation_id} not found` });
  if (res.locals.reservation.status ==='seated') return next({ status: 400, message: `Reservation ${res.locals.reservation.reservation_id} is already seated` });
  if (!table_id) return next({ status: 400, message: 'no table id?' });
  if (!data) return next({ status: 400, message: 'Body must include a data object' });
  let theTable = await service.read(table_id);
  if (theTable.status !== 'free') return next({ status: 400, message: 'table is occupied' });
  if (res.locals.reservation.people > theTable.capacity) {
    return next({
      status: 400,
      message: `Table ${theTable.table_name} has insufficient capacity for ${res.locals.reservation.people} people`,
    });
  }
  res.locals.reservation_id = data.reservation_id;
  res.locals.table = theTable;
  next();
}
async function checkIfOccupied(req, res, next) {
  if (res.locals.table.status !== 'occupied') {
    return next({ status: 400, message: 'Table is not occupied' });
  }
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
  await service.delete(table_id);
  return res.sendStatus(200);
}
function readTable(req, res) {
  return res.status(200).json({ data: res.locals.table });
}

module.exports = {
  list: [asyncErrorHandler(list)],
  create: [verifyTableData, asyncErrorHandler(createTable)],
  update: [preSeating, asyncErrorHandler(seatTable)],
  delete: [verifyTableId, checkIfOccupied, asyncErrorHandler(unseatTable)],
  read: [verifyTableId, readTable],
};
