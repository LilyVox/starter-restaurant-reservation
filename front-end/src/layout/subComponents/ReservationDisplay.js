import React from 'react';
import ReservationItem from './ReservationItem';
import _ from 'underscore';

const ReservationDisplay = ({ reservations }) => {
  const reservationList = [];
  const ifDataEmpty = _.isEmpty(reservations);
  if (Array.isArray(reservations) && !ifDataEmpty) {
    reservationList.push(
      reservations.map((res, index) => (
        <ReservationItem key={res.reservation_id} res={res} index={res.reservation_id} />
      ))
    );
  } else if (typeof reservations === 'object' && !ifDataEmpty) {
    reservationList.push(
      <ReservationItem res={reservations} index={reservations.reservation_id} />
    );
  } else {
    return <div className='row m-3'>{`No reservations were found.`}</div>;
  }
  return <div className='row m-1 gx-0'>{reservationList}</div>;
};

export default ReservationDisplay;
