import React  from 'react';
import TableShape from '../../tables/TableShape';

function TableDisplay({tables}) {
  let tableList = tables.map((table) => {
    return <TableShape table={table} />;
  });

  return <div className='flex row mb-3 gx-0 gy-2'>{tableList}</div>;
}

export default TableDisplay;
