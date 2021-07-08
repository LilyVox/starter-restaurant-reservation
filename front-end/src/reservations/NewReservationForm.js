import React from 'react';

function NewReservationForm({ submitHandler }) {
  return (
    <form onSubmit={submitHandler} className='' name='new_reservation'>
      <div className='row-auto'>
        <div className='col-auto'>
          <label className='form-label' htmlFor='first_name'>
            first name
          </label>
          <input className='form-control' type='text' id='first_name' name='first_name' />
          <label className='form-label' htmlFor='last_name'>
            last name
          </label>
          <input className='form-control' type='text' name='last_name' />
        </div>
        <div className='col-4'>
          <label className='form-label' htmlFor='mobile_number'>
            mobile number
          </label>
          <input
            className='form-control'
            type='tel'
            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
            name='mobile_number'
          />
        </div>
        <div className='col-auto'>
          <label className='form-label' htmlFor='reservation_time'>
            reservation time
          </label>
          <input className='form-control' type='time' name='reservation_time' />
          <label className='form-label' htmlFor='reservation_date'>
            reservation date
          </label>
          <input className='form-control' type='date' name='reservation_date' />
        </div>
      </div>
      <div className='row m-4'>
        <input type='submit' value='Submit Reservation' />
      </div>
    </form>
  );
}

export default NewReservationForm;
