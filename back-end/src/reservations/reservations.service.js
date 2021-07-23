const Knex = require('../db/connection');
const asyncErrorHandler = require('../errors/asyncErrorHandler');

const tableName = 'reservations';

function create(aNewReservation) {
  return Knex(tableName).insert(aNewReservation).returning('*');
}

function list() {
  return Knex(tableName).select('*').orderBy('reservation_time', 'asc');
}
function read(reservation_id){
  return Knex(tableName).select('*').where('reservation_id', reservation_id).first();
}
function listByDate(reservation_date) {
  return Knex(tableName).select('*').where('reservation_date', reservation_date).orderBy('reservation_time', 'asc');
}
function updateStatus(reservation_id, newStatus){
  return Knex(tableName).where('reservation_id', reservation_id).update('status', newStatus)
}
module.exports = {
  create,
  list,
  listByDate,
  read,
  updateStatus,
};
