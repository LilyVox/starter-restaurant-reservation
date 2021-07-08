const Knex = require('../db/connection');

const tableName = 'reservations';

function create(aNewReservation) {
  return Knex(tableName).insert(aNewReservation);
}

function list() {
  return Knex(tableName).select('*');
}

function listByDate(date) {
  return Knex(tableName).select('*').where({ reservation_date: date });
}
module.exports = {
  create,
  list,
  listByDate,
};
