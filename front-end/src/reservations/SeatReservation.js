import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { loadReservation } from './reservation.service';
import { seatTable, loadTables } from '../tables/tables.service';
import ErrorAlert from '../layout/subComponents/ErrorAlert';
import ErrorAlertDisplay from '../layout/subComponents/ErrorAlertDisplay';
import ReservationItem from '../layout/subComponents/ReservationItem';
const SeatReservation = () => {
  const [reservation, setReservation] = useState({});
  const { reservation_id } = useParams();
  const [error, setError] = useState({});
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState([]);
  const [tableIdValue, setTableIdValue] = useState();

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

  const seatHandler = async (e) => {
    e.preventDefault();
    let tableSelected = tables[tableIdValue];
    if (tableSelected && tableSelected.hasOwnProperty('capacity')) {
      if (tableSelected.capacity >= reservation.people) {
        await seatTable(reservation_id, tableSelected.table_id)
          .then((response) => {
            if (response.ok) history.push('/dashboard');
          })
          .catch(setTablesError);
      } else setError({ error: `${tableSelected.table_name} cannot seat ${reservation.people}` });
    } else setError({ error: `Please select an option below.` });
  };
  const selectHandler = (e) => {
    setTableIdValue(e.target.value);
  };
  function TableOptionDisplay() {
    if (Array.isArray(tables)) {
      const tableOptions = tables.map((table, index) => (
        <option key={table.table_id} disabled={table.status === 'occupied'} value={index}>
          {table.table_name} - {table.capacity}
        </option>
      ));
      return (
        <select
          name='table_id'
          className='form-select'
          value={tableIdValue}
          onSubmit={seatHandler}
          onChange={selectHandler}>
          {tableOptions}
        </select>
      );
    }
  }

  return (
    <div className='d-flex flex-column justify-content-center bg-transparent m-2 shadow'>
      <ErrorAlert error={error} />
      <ErrorAlertDisplay errors={tablesError} />
      <ReservationItem suppressSeat={true} res={reservation} index={reservation.reservation_id}/>
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
