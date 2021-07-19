const Knex = require('../db/connection');
const tableName = 'tables';

function list() {
  return Knex(tableName).select('*').orderBy('table_name', 'asc');
}

function create(aNewTable) {
  return Knex(tableName).insert(aNewTable).returning('*');
}

/**
 * 
 * @param {integer} table_id the table to seat
 * @param {integer} reservation_id the reservation to be seated
 * @returns nothing, just seats the reservation
 */
function update(table_id, reservation_id) {
  return Knex(tableName).where('table_id', table_id).update({status:'occupied', reservation_id});
}
function unseatTable(table_id){
  return Knex(tableName).where('table_id', table_id).update({status: 'free', reservation_id: null})
}
module.exports = {
  create,
  list,
  update,
  delete: unseatTable,
};
