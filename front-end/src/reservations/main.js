import React from 'react';
import NewReservationForm from './NewReservationForm';
import sendNewReservation from './reservationService';

/**
 *
 * @returns the reservation moderation screen.
 */
function ReservationMain() {
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const reqObject = {
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
      mobile_number: data.get('mobile_number'),
      reservation_time: data.get('reservation_time'),
      reservation_date: data.get('reservation_date'),
    }
    console.trace('sent FormData: ', reqObject);
    sendNewReservation(reqObject);
  };
  return (
    <main className='container-fluid'>
      <h1 className='my-0'>Create Reservation</h1>
      <NewReservationForm submitHandler={submitHandler} />
    </main>
  );
}

export default ReservationMain;
