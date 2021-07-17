import React from 'react';

function NewReservationForm({ submitHandler, changeHandler }) {
  return (
    <form onSubmit={submitHandler} onChange={changeHandler} className='' name='new_reservation'>
      <div className='row-auto'>
        <div className='col-auto'>
          <label className='form-label' htmlFor='first_name'>
            First Name
          </label>
          <input
            name='first_name'
            className='form-control'
            type='text'
            id='first_name'
            placeholder='First Name'
            required
            autoFocus
          />
          <label className='form-label' htmlFor='last_name'>
            Last Name
          </label>
          <input
            className='form-control'
            type='text'
            name='last_name'
            placeholder='Last Name'
            required
          />
        </div>
        <div className='col-auto'>
          <label className='form-label' htmlFor='mobile_number'>
            Mobile Number
          </label>
          <input
            name='mobile_number'
            className='form-control'
            type='tel'
            placeholder='XXX-XXX-XXXX'
            required
          />
          <label htmlFor='people'>People</label>
          <input className='form-control' type='number' name='people' id='people' required />
        </div>
        <div className='col-auto'>
          <label className='form-label' htmlFor='reservation_time'>
            Reservation Time
          </label>
          <input
            className='form-control'
            type='time'
            name='reservation_time'
            placeholder='HH:MM'
            required
          />
          <label className='form-label' htmlFor='reservation_date'>
            Reservation Date
          </label>
          <input className='form-control' type='date' name='reservation_date' required />
        </div>
      </div>
      <div className='row m-4'>
        <button type='submit' className='btn btn-warning'>
          Submit Reservation
        </button>
      </div>
    </form>
  );
}

export default NewReservationForm;
