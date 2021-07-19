import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorAlert from '../layout/subComponents/ErrorAlert';
import NewReservationForm from './NewReservationForm';
import sendNewReservation from './reservation.service';

const reservationObject = {
  first_name: '',
  last_name: '',
  mobile_number: '',
  reservation_time: '',
  reservation_date: '',
  people: 0,
};
/**
 *
 * @returns the reservation moderation screen.
 */
function ReservationMain() {
  const [reservation, setReservation] = useState(reservationObject);
  const [reservationsError, setReservationsError] = useState([]);
  const history = useHistory();
  let errors = [];

  const submitHandler = async (e) => {
    e.preventDefault();
    let validToSend = await checkFields().then((errors) => {
      if (errors.length > 0) return false;
      return true;
    });
    if (validToSend) {
      await sendNewReservation(reservation).then((response) => {
        if (response.ok) {
          history.push(`/dashboard?date=${reservation.reservation_date}`);
          return response.json();
        }
      });
    }
  };
  /**
   * Validates the date to make sure it's reasonable
   */
  async function checkFields() {
    const reservationDate = new Date(
      `${reservation.reservation_date}T${reservation.reservation_time}:00.000`
    );
    const today = new Date();

    if (reservationDate.getDay() === 2) {
      errors.push("'reservation_date' field: restaurant is closed on tuesday");
    }

    if (reservationDate < today) {
      errors.push("'reservation_date' and 'reservation_time' field must be in the future");
    }

    if (
      reservationDate.getHours() < 10 ||
      (reservationDate.getHours() === 10 && reservationDate.getMinutes() < 30)
    ) {
      errors.push("'reservation_time' field: restaurant is not open until 10:30AM");
    }

    if (
      reservationDate.getHours() > 22 ||
      (reservationDate.getHours() === 22 && reservationDate.getMinutes() >= 30)
    ) {
      errors.push("'reservation_time' field: restaurant is closed after 10:30PM");
    }

    if (
      reservationDate.getHours() > 21 ||
      (reservationDate.getHours() === 21 && reservationDate.getMinutes() > 30)
    ) {
      errors.push(
        "'reservation_time' field: reservation must be made at least an hour before closing (10:30PM)"
      );
    }
    if (errors.length > 0) setReservationsError([...errors]);
    else setReservationsError([]);
    return errors;
  }
  const changeHandler = ({ target }) => {
    let keyName = target.name;
    let value =
      keyName === 'people'
        ? Number(target.value)
        : keyName === 'mobile_number'
        ? formatPhoneNum(target.value)
        : target.value;
    setReservation({
      ...reservation,
      [keyName]: value,
    });
  };
  const cancelHandler = () => {
    history.goBack();
  };
  function formatPhoneNum(phoneNum) {
    if (phoneNum.match(/[0-9]{3}-[0-9]{3}-[0-9]{4}/)) return phoneNum;
    if (phoneNum.match(/\d{9}/)) return phoneNum.replace(/(\d{3})-?(\d{3})-?(\d{4})/, '$1-$2-$3');
  }
  let errDisplay =
    reservationsError.length > 0
      ? reservationsError.map((error, index) => <ErrorAlert key={index} error={{ error: error }} />)
      : null;
  return (
    <main className='container-fluid justify-content-center'>
      <h1 className='my-0'>Create Reservation</h1>
      {errDisplay}
      <NewReservationForm submitHandler={submitHandler} changeHandler={changeHandler} />
      <button className='btn btn-primary' onClick={cancelHandler}>
        Cancel
      </button>
    </main>
  );
}

export default ReservationMain;
