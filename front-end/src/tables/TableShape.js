import React from 'react';

export const TableShape = ({ table, finishHandler }) => {
  let condition = table.status === 'occupied';
  return (
    <div
      className='card flex-4 text-center bg-transparent border-bottom rounded-3 border-0 m-2 shadow'
      style={{ width: '16EM' }}>
      <div className='card-header border-secondary'>{`${table.table_name} Seats up to ${table.capacity}`}</div>
      <p
        className={`card-body ${!condition ? 'bg-success' : 'bg-warning'}`}
        data-table-id-status={table.table_id}>
        {table.reservation_id? "occupied": "free"}
      </p>
      {table.reservation_id && (
        <button
          className='btn btn-danger'
          data-table-id-finish={table.table_id}
          onClick={(e) => finishHandler(table.table_id, e)}>
          Finish
        </button>
      )}
    </div>
  );
};

export default TableShape;
