import React from 'react';

export const TableShape = ({ table, finishHandler }) => {
  return (
    <div>
      <div className='card flex-4 text-center bg-transparent m-2 shadow' style={{ width: '20EM' }}>
        <div className='card-header'>{`${table.table_name} Seats up to ${table.capacity}`}</div>
        <div className='card-body'>
          <div data-table-id-status={table.table_id} >
            {table.status === 'occupied'
              ? `${table.status} with ${table.reservation_id}`
              : `${table.status}`}
          </div>
        </div>
        <button className='btn btn-danger' hidden={table.status === 'occupied'? false: true} onClick={()=>finishHandler(table.table_id)}>Finish</button>
      </div>
    </div>
  );
};

export default TableShape;