const Knex = require('../db/connection');
const asyncErrorHandler = require('../errors/asyncErrorHandler');

const tableName = 'reservations';

function create(aNewReservation) {
  return Knex(tableName).insert(aNewReservation).returning('*');
}
function search(mobile_number) {
  return Knex('reservations')
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, '')}%`
    )
    .orderBy('reservation_date');
}
function list() {
  return Knex(tableName)
    .whereNot('status', 'finished')
    .select('*')
    .orderBy('reservation_time', 'asc');
}
function read(reservation_id) {
  return Knex(tableName).select('*').where('reservation_id', reservation_id).first();
}
function listByDate(reservation_date) {
  return Knex(tableName)
    .select('*')
    .whereNot('status', 'finished')
    .andWhere('reservation_date', reservation_date)
    .orderBy('reservation_time', 'asc');
}
function updateStatus(reservation_id, newStatus) {
  return Knex(tableName)
    .where('reservation_id', reservation_id)
    .update('status', newStatus, ['status']);
}
module.exports = {
  create,
  list,
  listByDate,
  read,
  search,
  updateStatus,
};
