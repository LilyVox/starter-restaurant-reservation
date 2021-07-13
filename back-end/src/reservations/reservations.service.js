const Knex = require('../db/connection');

const tableName = 'reservations';

function create(aNewReservation) {
  return Knex(tableName).insert(aNewReservation).returning('*');
}

function list() {
  return Knex(tableName).select('*');
}

function listByDate(reservation_date) {
  return Knex(tableName).select('*').where('reservation_date', reservation_date);
}
module.exports = {
  create,
  list,
  listByDate,
};
