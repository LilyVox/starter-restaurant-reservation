import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { seatTable, loadReservation } from '../tables/tables.service';
import ErrorAlert from '../layout/subComponents/ErrorAlert';

const SeatReservation = () => {
  const [reservation, setReservation] = useState({});
  const { reservation_id } = useParams();
  const [error, setError] = useState({});
  const history = useHistory();
  useEffect(() => {
    const abort = new AbortController();
    loadReservation(reservation_id, abort.signal).then(setReservation).catch(setError);
    return () => abort.abort();
  }, [reservation_id]);

  return (
    <div className='card flex-4 text-center bg-transparent m-2 shadow' style={{ width: '' }}>
      {`${reservation_id}`}
      <ErrorAlert error={error} />
      <div className='card-header'>{`Reservation for ${reservation.people}`}</div>
      <div className='card-body'>{`${reservation.first_name}, ${reservation.last_name}`}</div>
      <div className='card-footer'>{`${reservation.reservation_time}`}</div>
      <button className='btn btn-warning' href={`/reservations/${reservation_id}/seat`}>
        Seat
      </button>
      <button className='btn btn-primary' onClick={() => history.goBack()}>
        Back
      </button>
    </div>
  );
};

export default SeatReservation;
