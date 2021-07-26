import React from 'react';

const ReservationItem = ({
  res,
  index,
  suppressSeat = null,
  cancelHandler = null,
  showWhenFinished,
}) => {
  const SeatDisplay = () => {
    return (
      <a className='btn btn-success' href={`/reservations/${res.reservation_id}/seat`}>
        Seat
      </a>
    );
  };
  const EditDisplay = () => {
    return (
      <a className='btn btn-primary' href={`/reservations/${res.reservation_id}/edit`}>
        Edit
      </a>
    );
  };
  const CancelDisplay = () => {
    if (cancelHandler === null) return null;
    return (
      <button
        className='btn btn-primary'
        onClick={() => cancelHandler(res.reservation_id)}
        data-reservation-id-cancel={res.reservation_id}>
        Cancel
      </button>
    );
  };
  let isFinished = res.status === 'finished';
  let condition = !showWhenFinished || isFinished || showWhenFinished;
  let seatCondition = suppressSeat ? false : res.status === 'booked';
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
        <div className='card-footer'>
          {!isFinished && <CancelDisplay />}
          {` ${res.reservation_time} `}
          <EditDisplay />
        </div>
        {!isFinished && seatCondition && <SeatDisplay />}
      </div>
    )
  );
};

export default ReservationItem;
