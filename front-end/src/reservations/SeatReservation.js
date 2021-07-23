import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { loadReservation, updateReservationStatus } from './reservation.service';
import { seatTable, loadTables } from '../tables/tables.service';
import ErrorAlert from '../layout/subComponents/ErrorAlert';
import ErrorAlertDisplay from '../layout/subComponents/ErrorAlertDisplay';

const SeatReservation = () => {
  const [reservation, setReservation] = useState({});
  const { reservation_id } = useParams();
  const [error, setError] = useState({});
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState([]);
  let tablePicked = 0;
  useEffect(() => {
    const abort = new AbortController();
    const abortControllerTable = new AbortController();
    loadReservation(reservation_id, abort.signal).then(setReservation).catch(setError);
    loadTables(abortControllerTable.signal).then(setTables).catch(setTablesError);
    return () => {
      abortControllerTable.abort();
      abort.abort();
    };
  }, [reservation_id]);

  const seatHandler = async () => {
    let theTable = tables.find(table=> Number(table.table_id) === Number(tablePicked))
    if(theTable.capacity >= reservation.people){
      await seatTable(reservation_id, theTable.table_id).then(response=>{
        if(response.ok) history.push('/dashboard');
      }).catch(setTablesError);
    } else setError({error: `${theTable.table_name} cannot seat ${reservation.people}`})
  };
  const selectHandler = (e) => {
    tablePicked = e.target.value;
  };
  function TableOptionDisplay() {
    if (Array.isArray(tables)) {
      let validTables = tables.filter((table) => (table.status === 'occupied' ? false : true));
      const tableOptions = (
        validTables.map((table, index) => (
          <option key={index} value={table.table_id}>
            {table.table_name} - {table.capacity}
          </option>
        ))
      );
      return (
        <select name='table_id' className='form-select' onChange={selectHandler}>
          {tableOptions}
        </select>
      );
    }
  }

  return (
    <div className='card flex-4 text-center bg-transparent m-2 shadow' style={{ width: '' }}>
      {`Reservation id: ${reservation_id}`}
      <ErrorAlert error={error} />
      <ErrorAlertDisplay errors={tablesError} />
      <div className='card-header'>{`Reservation for ${reservation.people}`}</div>
      <div className='card-body'>{`${reservation.first_name}, ${reservation.last_name}`}</div>
      <div className='card-footer'>{`${reservation.reservation_time}`}</div>
      <TableOptionDisplay />
      <button className='btn btn-success' type='submit' onClick={seatHandler}>
        Submit
      </button>
      <button className='btn btn-primary' onClick={() => history.goBack()}>
        Cancel
      </button>
    </div>
  );
};

export default SeatReservation;
