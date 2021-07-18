import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { listReservations } from '../utils/api';
import { previous, today, next } from '../utils/date-time';
import ReservationDisplay from '../layout/subComponents/ReservationDisplay';
import ErrorAlert from '../layout/subComponents/ErrorAlert';

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();
  const { reservation_id } = useParams();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main className='px-2'>
      <h1 className='m-1'>Dashboard</h1>
      <div className='mb-3'>
        <h4 className=''>Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationDisplay reservations={reservations} />
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
