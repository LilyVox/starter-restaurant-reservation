const Knex = require('../db/connection');
const tableName = 'tables';

function list() {
  return Knex(tableName).select('*').orderBy('table_name', 'asc');
}

function create(aNewTable) {
  return Knex(tableName).insert(aNewTable).returning('*');
}
function read(table_id) {
  return Knex(tableName).select('*').where('table_id', table_id).first();
}
/**
 *
 * @param {integer} table_id the table to seat
 * @param {integer} reservation_id the reservation to be seated
 * @returns nothing, just seats the reservation
 */
async function update(table_id, reservation_id) {
  return await Knex.transaction(async (trx) => {
    await Knex('reservations')
      .transacting(trx)
      .where('reservation_id', reservation_id)
      .update({ status: 'seated' });
    return trx(tableName)
      .where('table_id', table_id)
      .update({ status: 'occupied', reservation_id });
  }).catch((e) => {
    console.log(e);
    console.log('transaction failed');
  });
}
async function unseatTable(table_id) {
  return await Knex.transaction(async (trx) => {
    let table = await Knex(tableName).select('reservation_id').where('table_id', table_id).first();
    await Knex('reservations')
      .transacting(trx)
      .where('reservation_id', table.reservation_id)
      .update({ status: 'finished' });
    return trx(tableName)
      .where('table_id', table_id)
      .update({ status: 'free', reservation_id: null });
  });
}
module.exports = {
  create,
  read,
  list,
  update: update,
  delete: unseatTable,
};
