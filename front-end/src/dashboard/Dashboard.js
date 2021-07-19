import React, { useEffect, useState } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import { listReservations } from '../utils/api';
import { previous, today, next } from '../utils/date-time';
import ReservationDisplay from '../layout/subComponents/ReservationDisplay';
import ErrorAlert from '../layout/subComponents/ErrorAlert';
import TableDisplay from '../layout/subComponents/TableDisplay';
import SeatReservation from '../reservations/SeatReservation';
// import {loadReservation} from '../reservations/reservation.service';
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
      abortControllerReservation.abort()
      abortControllerTable.abort()
      setTablesError([])
      setReservationsError(null);
    };
  }
  const finishHandler = async(e)=>{
    unseatTable()
  }
  let tableErrDisplay =
    tablesError.length > 0
      ? tablesError.map((error, index) => <ErrorAlert key={index} error={{ error: error }} />)
      : null;
  return (
    <main className='px-2'>
      <h1 className='m-1'>Dashboard</h1>
      <div className='mb-3'>
        <h4 className=''>Reservations for {date}</h4>
      </div>
      {tableErrDisplay}
      <ErrorAlert error={reservationsError} />
      <Switch>
        <Route path='/'>
          <ReservationDisplay reservations={reservations} />
        </Route>
        <Route path='/reservations/:reservation_id/seat'>
          <SeatReservation tables={tables} />
        </Route>
      </Switch>
      <TableDisplay finishHandler={finishHandler} tables={tables} />
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
    </main>
  );
}

export default Dashboard;
