import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorAlert from '../layout/subComponents/ErrorAlert';
import NewReservationForm from './NewReservationForm';
import sendNewReservation from './reservationService';

/**
 *
 * @returns the reservation moderation screen.
 */
function ReservationMain() {
  const [reservationsError, setReservationsError] = useState(null);

  const history = useHistory();
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const reqObject = {
      first_name: data.get('first_name'),
      last_name: data.get('last_name'),
      mobile_number: data.get('mobile_number'),
      reservation_time: data.get('reservation_time'),
      reservation_date: data.get('reservation_date'),
      people: parseInt(data.get('people'))
    };
    let thing = await sendNewReservation(reqObject).then((response) => {
      if (response.ok) {
        history.push(`/dashboard?date=${data.get('reservation_date')}`);
      }
      return response.json();
    });
    if (thing.error) {
      setReservationsError(thing);
      console.log(reservationsError);
    }
  };
  const cancelHandler = (e) => {
    history.goBack();
  };
  return (
    <main className='container-fluid justify-content-center'>
      <h1 className='my-0'>Create Reservation</h1>
      <ErrorAlert error={reservationsError} />
      <NewReservationForm submitHandler={submitHandler} />
      <button className='btn btn-primary' onClick={cancelHandler}>
        Cancel
      </button>
    </main>
  );
}

export default ReservationMain;
