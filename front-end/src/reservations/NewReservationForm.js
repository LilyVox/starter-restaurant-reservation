import React from 'react';

function NewReservationForm({ reservation = {}, submitHandler, changeHandler }) {
  
  return (
    <form
      onSubmit={submitHandler}
      onChange={changeHandler}
      className=''
      id='reservation_form'
      name='reservation_form'>
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
            value={reservation['first_name']}
            onChange={changeHandler}
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
            id='last_name'
            placeholder='Last Name'
            value={reservation['last_name']}
            onChange={changeHandler}
            required
          />
        </div>
        <div className='col-auto'>
          <label className='form-label' htmlFor='mobile_number'>
            Mobile Number
          </label>
          <input
            name='mobile_number'
            id='mobile_number'
            className='form-control'
            type='tel'
            onChange={changeHandler}
            value={reservation['mobile_number']}
            placeholder='XXX-XXX-XXXX'
            required
          />
          <label htmlFor='people'>People</label>
          <input
            className='form-control'
            type='number'
            name='people'
            id='people'
            required
            value={reservation['people']}
            onChange={changeHandler}
          />
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
            value={reservation['reservation_time']}
            onChange={changeHandler}
            required
          />
          <label className='form-label' htmlFor='reservation_date'>
            Reservation Date
          </label>
          <input
            className='form-control'
            type='date'
            id='reservation_date'
            name='reservation_date'
            value={reservation['reservation_date']}
            onChange={changeHandler}
            required
          />
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
