import React, { useState } from 'react';
import ReservationDisplay from '../layout/subComponents/ReservationDisplay';
import { search } from './search.service';
import ErrorAlert from '../layout/subComponents/ErrorAlert';
import _ from 'underscore';
const SearchHomepage = () => {
  const [reservationSearch, setReservationSearch] = useState([]);
  const [error, setError] = useState({});
  let reservationSearchCondition = _.isEmpty(reservationSearch);
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let mb = formData.get('mobile_number');
    await search(mb).then(setReservationSearch).catch(setError);
  };
  return (
    <main className='text-center bg-transparent m-2'>
      <header className='row shadow'>
        <h1>
          <b>Search</b>
        </h1>
      </header>
      <ErrorAlert error={error} />
      <section className='d-flex bg-transparent row m-2'>
        <div className='col-6'>
          <form className='' onSubmit={submitHandler}>
            <label htmlFor='mobile_number' className='form-label'>
              Mobile Number
            </label>
            <input
              className='form-control'
              name='mobile_number'
              id='mobile_number'
              type='tel'
              placeholder="Enter a customer's phone number"
            />
            <button type='submit' className='btn btn-warning'>
              submit
            </button>
          </form>
        </div>
        <div className='col-6'>
          {!reservationSearchCondition ? (
            <ReservationDisplay reservations={reservationSearch} />
          ) : (
            `No reservations found`
          )}
        </div>
      </section>
    </main>
  );
};

export default SearchHomepage;
