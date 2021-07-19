import React from 'react';

export const TableShape = ({ table }) => {
  return (
    <div>
      <div className='card flex-4 text-center bg-transparent m-2 shadow' style={{ width: '20EM' }}>
        <div className='card-header'>{`Table: ${table.table_name}`}</div>
        <div className='card-body'>
          <div data-table-id-status={table.table_id} >
            {table.status === 'occupied'
              ? `${table.status} with ${table.reservation_id}`
              : `${table.status}`}
          </div>
        </div>
        <div className='card-footer'>
          {`Seats up to ${table.capacity}`}
          <link className='btn btn-success' onClick={(table.table_id)}>
            Seat
          </link>
        </div>
      </div>
    </div>
  );
};
