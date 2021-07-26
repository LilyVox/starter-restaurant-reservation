import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'underscore';
import ErrorAlertDisplay from '../layout/subComponents/ErrorAlertDisplay';
import NewReservationForm from './NewReservationForm';
import sendNewReservation, {
  loadReservation,
  updateExistingReservation,
} from './reservation.service';
const reservationObject = {
  first_name: '',
  last_name: '',
  mobile_number: '',
  reservation_time: '',
  reservation_date: '',
  people: 1,
};
/**
 * @returns the reservation moderation screen.
 */
function ReservationMain() {
  const location = useLocation();
  const [reservation, setReservation] = useState(reservationObject);
  const [errorState, setErrorState] = useState([]);
  const history = useHistory();
  let localErrors = [];
  let pathArr = location.pathname.split('/');
  let reservation_id = pathArr[2];
  let areWeEditing = pathArr[3] === 'edit';

  useEffect(() => {
    if (areWeEditing) {
      const abort = new AbortController();
      loadReservation(reservation_id, abort.signal)
        .then((data) => {
          setReservation({ ...data, reservation_date: data.reservation_date.slice(0, 10) });
        })
        .catch((e) => setErrorState([e.message]));
      return () => {
        abort.abort();
        setErrorState([]);
      };
    } else {
      setReservation(reservationObject);
      setErrorState([]);
    }
  }, [areWeEditing, reservation_id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    checkFields();
    if (_.isEmpty(localErrors)) {
      const updatedReservation = {
        ...reservation,
        mobile_number: formatPhoneNum(reservation.mobile_number),
        reservation_date: formatDate(reservation.reservation_date),
      };
      if (areWeEditing) {
        await updateExistingReservation(reservation_id, updatedReservation)
          .then(() => {
            history.push(`/dashboard?date=${updatedReservation.reservation_date}`);
          })
          .catch((e) => localErrors.push(e));
      } else {
        await sendNewReservation(updatedReservation)
          .then((response) => {
            if (response.ok) {
              history.push(`/dashboard?date=${updatedReservation.reservation_date}`);
            }
          })
          .catch((e) => localErrors.push(e));
      }
    } else setErrorState([...localErrors]);
  };
  /**
   * Validates the date to make sure it's reasonable
   */
  function checkFields() {
    const reservationDate = areWeEditing
      ? new Date(
          `${reservation.reservation_date.slice(0, 10)}T${reservation.reservation_time}:00.000`
        )
      : new Date(`${reservation.reservation_date}T${reservation.reservation_time}:00.000`);
    const today = new Date();
    if (reservationDate.getDay() === 2) {
      localErrors.push("'reservation_date' field: restaurant is closed on tuesday");
    }
    if (reservationDate < today) {
      localErrors.push("'reservation_date' and 'reservation_time' field must be in the future");
    }
    if (
      reservationDate.getHours() < 10 ||
      (reservationDate.getHours() === 10 && reservationDate.getMinutes() < 30)
    ) {
      localErrors.push("'reservation_time' field: restaurant is not open until 10:30AM");
    }
    if (
      reservationDate.getHours() > 22 ||
      (reservationDate.getHours() === 22 && reservationDate.getMinutes() >= 30)
    ) {
      localErrors.push("'reservation_time' field: restaurant is closed after 10:30PM");
    }
    if (
      reservationDate.getHours() > 21 ||
      (reservationDate.getHours() === 21 && reservationDate.getMinutes() > 30)
    ) {
      localErrors.push(
        "'reservation_time' field: reservation must be made at least an hour before closing (10:30PM)"
      );
    }
    setErrorState([...localErrors]);
    return localErrors;
  }
  const changeHandler = ({ target }) => {
    let keyName = target.name;
    let value = keyName === 'people' ? Number(target.value) : target.value;
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
    return phoneNum;
  }
  function formatDate(reservation_date) {
    if (reservation_date.match(/\d{4}-\d{2}-\d{2}/)) return reservation_date;
    if (reservation_date.match(/\d{8}/))
      return reservation_date.replace(/(\d{4})-?(\d{2})-?(\d{2})/, '$1-$2-$3');
    return reservation_date.slice(0, 10);
  }

  return (
    <main className='container-fluid justify-content-center'>
      <h1 className='my-0'>{areWeEditing ? 'Edit' : 'Create'} Reservation</h1>
      <ErrorAlertDisplay incErrors={errorState} />
      <NewReservationForm
        reservation={reservation}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
      />
      <button className='btn btn-primary' onClick={cancelHandler}>
        Cancel
      </button>
    </main>
  );
}

export default ReservationMain;
