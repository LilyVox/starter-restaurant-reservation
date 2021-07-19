import React from 'react';

export const TableShape = ({ table, finishHandler }) => {
  return (
    <div>
      <div className='card flex-4 text-center bg-transparent m-2 shadow' style={{ width: '20EM' }}>
        <div className='card-header'>{`${table.table_name} Seats up to ${table.capacity}`}</div>
        <div className='card-body' data-table-id-status={table.table_id}>
          {table.status} {table.reservation_id && `with ${table.reservation_id}`}
        </div>
        <button
          className='btn btn-danger'
          data-table-id-finish={table.table_id}
          hidden={table.status === 'occupied' ? false : true}
          onClick={() => finishHandler(table.table_id)}>
          Finish
        </button>
      </div>
    </div>
  );
};

export default TableShape;
