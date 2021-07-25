import React from 'react';
import ReservationItem from './ReservationItem';
import _ from 'underscore';

const ReservationDisplay = ({ reservations, cancelHandler }) => {
  const ifDataEmpty = _.isEmpty(reservations);
  const reservationDisplayClasses = 'row m-1 gx-0';

  if (Array.isArray(reservations) && !ifDataEmpty) {
    return (
      <div className={reservationDisplayClasses}>
        {reservations.map((res) => (
          <ReservationItem
            key={res.reservation_id}
            res={res}
            index={res.reservation_id}
            cancelHandler={cancelHandler}
          />
        ))}
      </div>
    );
  } else if (typeof reservations === 'object' && !ifDataEmpty) {
    return (
      <div className={reservationDisplayClasses}>
        <ReservationItem
          res={reservations}
          index={reservations.reservation_id}
          cancelHandler={cancelHandler}
        />
      </div>
    );
  } else {
    return <div className={'row m-3'}>{`No reservations were found.`}</div>;
  }
};

export default ReservationDisplay;
