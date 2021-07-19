import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { loadReservation } from './reservation.service';
// import { seatTable } from '../tables/tables.service';
import ErrorAlert from '../layout/subComponents/ErrorAlert';

const SeatReservation = ({ tables }) => {
  const [reservation, setReservation] = useState({});
  const { reservation_id } = useParams();
  const [error, setError] = useState({});
  const history = useHistory();

  useEffect(() => {
    const abort = new AbortController();
    loadReservation(reservation_id, abort.signal).then(setReservation).catch(setError);
    return () => abort.abort();
  }, [reservation_id]);

  const seatHandler = (e) => {
      // validate first
      console.log(`SeatReservation; e.target ${e.target}`, `e.target.name ${e.target.name}`);
      // seatTable();
  };

  function TableOptionDisplay() {
    if (Array.isArray(tables)) {
      let validTables = tables.filter((table) => (table.status === 'occupied' ? false : true));
      return validTables.map((table) => (
        <option value={table.table_id}>
          {table.table_name} - {table.capacity}
        </option>
      ));
    }
  }
  return (
    <div className='card flex-4 text-center bg-transparent m-2 shadow' style={{ width: '' }}>
      {`${reservation_id}`}
      <ErrorAlert error={error} />
      <div className='card-header'>{`Reservation for ${reservation.people}`}</div>
      <div className='card-body'>{`${reservation.first_name}, ${reservation.last_name}`}</div>
      <div className='card-footer'>{`${reservation.reservation_time}`}</div>
      <select name='table_id' class='form-select' multiple aria-label='multiple select example'>
        <TableOptionDisplay />
        <input className='btn btn-success' type="submit" onClick={seatHandler}>Submit</input>
      </select>
      <button className='btn btn-primary' onClick={() => history.goBack()}>
        Back
      </button>
    </div>
  );
};

export default SeatReservation;
