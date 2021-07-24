import React from 'react';
// import { Link } from 'react-router-dom';

const ReservationDisplay = ({ reservations }) => {
  let reservationList = reservations.map((res, index) => {
    let condition = res.status !== 'finished';
    let seatCondition = res.status !== 'seated';
    const SeatDisplay = () => {
      return (
        <a className='btn btn-success' href={`/reservations/${res.reservation_id}/seat`}>
          Seat
        </a>
      );
    };
    return (
      condition && (
        <div
          className='card flex-4 text-center bg-transparent m-2 shadow'
          style={{ width: '20EM' }}
          key={index}>
          <div className='card-header'>{`Reservation ID: ${res.reservation_id}`}</div>
          <div className='card-body'>
            {`${res.first_name}, ${res.last_name}`}
            {`Reservation for ${res.people}`}
          </div>
          <div
            className='card-body'
            data-reservation-id-status={res.reservation_id}>{`${res.status}`}</div>
          <div className='card-footer'>{`${res.reservation_time}`}</div>
          {seatCondition && <SeatDisplay />}
        </div>
      )
    );
  });

  return <div className='flex row mb-3 gx-0 gy-2'>{reservationList}</div>;
};

export default ReservationDisplay;
