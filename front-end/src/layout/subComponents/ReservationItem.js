import React from 'react';

const ReservationItem = ({ res, index, suppressSeat = null }) => {
  const SeatDisplay = () => {
    return (
      <a className='btn btn-success' href={`/reservations/${res.reservation_id}/seat`}>
        Seat
      </a>
    );
  };
  let condition = res.status !== 'finished';
  let seatCondition = suppressSeat ? false : res.status !== 'seated';
  return (
    condition && (
      <div
        className='card text-center bg-transparent border-warning border-bottom rounded-3 border-0 m-2 shadow'
        key={index}>
        <div className='card-header'>{`Reservation ID: ${res.reservation_id}`}</div>
        <div className='card-body'>
          {`${res.first_name}, ${res.last_name}`}
          <br />
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
};

export default ReservationItem;
