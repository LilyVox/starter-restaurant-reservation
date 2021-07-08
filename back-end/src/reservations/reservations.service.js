const express = require('express');
const Knex = require('knex');
const router = express.Router();

const tableName = 'reservations';

function create(aNewReservation) {
  return Knex(tableName).insert(aNewReservation);
}
function list() {
  return Knex(tableName).select('*');
}
function listByDate(date) {
  knex(tableName).select('*').where({ reservation_date: date });
}
module.exports = {
  create,
  list,
  listByDate,
};
