import React from 'react';
import TableShape from '../../tables/TableShape';

function TableDisplay({ tables, finishHandler }) {
  let tableList = null;
  if (tables.length > 0) {
    tableList = tables.map((table) => {
      return <TableShape key={table.table_id} table={table} finishHandler={finishHandler} />;
    });
  }
  return (
    <div className='flex row m-3 gx-0 '>
      <h2 className='px-5'><b>Tables</b></h2>
      {tableList}
    </div>
  );
}

export default TableDisplay;
