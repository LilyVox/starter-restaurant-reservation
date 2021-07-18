import React, { useEffect, useState } from 'react';
import { loadTables } from '../../tables/tables.service';
import { Link } from 'react-router-dom';

function TableDisplay() {
  const [tables, setTables] = useState([]);
  useEffect(() => {
    const abort = new AbortController();
    loadTables(abort.signal).then(setTables);
    return () => abort.abort();
  }, []);
  let tableList = tables.map((res) => {
    return (
      <div className='card flex-4 text-center bg-transparent m-2 shadow' style={{ width: '20EM' }}>
        <div className='card-header'>{`Reservation for ${res.people}`}</div>
        <div className='card-body'>{`${res.first_name}, ${res.last_name}`}</div>
        <div className='card-footer'>{`${res.reservation_time}`}</div>
        <Link className='btn btn-success' to={`/reservations/${res.reservation_id}/seat`}>
          Seat
        </Link>
      </div>
    );
  });

  return <div className='flex row mb-3 gx-0 gy-2'>{tableList}</div>;
}

export default TableDisplay;
