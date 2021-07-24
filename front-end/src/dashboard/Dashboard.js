import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { listReservations } from '../utils/api';
import { previous, today, next } from '../utils/date-time';
import ReservationDisplay from '../layout/subComponents/ReservationDisplay';
import ErrorAlert from '../layout/subComponents/ErrorAlert';
import ErrorAlertDisplay from '../layout/subComponents/ErrorAlertDisplay';
import TableDisplay from '../layout/subComponents/TableDisplay';
import { loadTables, unseatTable } from '../tables/tables.service';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState([]);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortControllerReservation = new AbortController();
    const abortControllerTable = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortControllerReservation.signal)
      .then(setReservations)
      .catch(setReservationsError);
    loadTables(abortControllerTable.signal).then(setTables).catch(setTablesError);
    return () => {
      abortControllerReservation.abort();
      abortControllerTable.abort();
      setTablesError([]);
      setReservationsError(null);
    };
  }
  const finishHandler = async (table_id) => {
    let timeToFinish = window.confirm('Is this table ready to seat new guests?');
    if (timeToFinish) {
      await unseatTable(table_id)
        .then((response) => {
          if (response.ok) {
            history.push('/tables')
          };
        })
        .catch(setTablesError);
    }
  };

  return (
    <main className='px-2 d-flex row justify-content-around'>
      <div className='mb-3 text-center'>
        <h1 className='m-1'>Dashboard</h1>
        <h4 className=''>Reservations for {date}</h4>
      </div>
      <ErrorAlertDisplay errors={tablesError} />
      <ErrorAlert error={reservationsError} />
      <div className='col-4'>
        <ReservationDisplay reservations={reservations} />
      </div>
      <div className='col-4'>
        <TableDisplay finishHandler={finishHandler} tables={tables} />
      </div>
      <div className='text-center'>
        <button
          className='btn btn-dark'
          type='button'
          onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>
          Previous Day
        </button>
        <button
          className='btn btn-dark'
          type='button'
          onClick={() => history.push(`/dashboard?date=${today()}`)}>
          Today
        </button>
        <button
          className='btn btn-dark'
          type='button'
          onClick={() => history.push(`/dashboard?date=${next(date)}`)}>
          Next Day
        </button>
      </div>
    </main>
  );
}

export default Dashboard;
