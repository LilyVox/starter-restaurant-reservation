import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { listReservations } from '../utils/api';
import { previous, today, next } from '../utils/date-time';
import ReservationDisplay from '../layout/subComponents/ReservationDisplay';
import ErrorAlertDisplay from '../layout/subComponents/ErrorAlertDisplay';
import TableDisplay from '../layout/subComponents/TableDisplay';
import { loadTables, unseatTable } from '../tables/tables.service';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, cancelHandler }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [errorArray, setErrorArray] = useState([]);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortControllerReservation = new AbortController();
    const abortControllerTable = new AbortController();
    listReservations({ date }, abortControllerReservation.signal)
      .then(setReservations)
      .catch(setErrorArray);
    loadTables(abortControllerTable.signal).then(setTables).catch(setErrorArray);
    return () => {
      abortControllerReservation.abort();
      abortControllerTable.abort();
    };
  }

  const finishHandler = (table_id, e) => {
    if (window.confirm('Is this table ready to seat new guests?')) {
      const abortControllerReservation = new AbortController();
      const abortControllerTable = new AbortController();
      unseatTable(table_id)
        .then((response) => {
          if (response.ok) {
            listReservations({ date }, abortControllerReservation.signal)
              .then(setReservations)
              .catch(setErrorArray);
            loadTables(abortControllerTable.signal).then(setTables).catch(setErrorArray);
          } else setErrorArray([...errorArray, { error: 'did not "ok"' }]);
        })
        .catch(setErrorArray);
    }
  };

  return (
    <main className=' d-flex row justify-content-center'>
      <div className='mb-3 text-center shadow'>
        <h1 className='m-1'>Dashboard</h1>
        <h4 className=''>Reservations for {date}</h4>
      </div>
      <ErrorAlertDisplay incErrors={errorArray} />
      <div className='col-6'>
        <ReservationDisplay
          showWhenFinished={false}
          cancelHandler={cancelHandler}
          reservations={reservations}
        />
      </div>
      <div className='col-6'>
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
