import React from 'react';

const TableForm = ({ changeHandler, submitHandler }) => {
  return (
    <div className='container'>
      <form
        name='new_table_form'
        onSubmit={submitHandler}
        onChange={changeHandler}
        className='flex-col bg-transparent m-2 p-2'>
        <label className='form-label' htmlFor='table_name'>
          Table Name
        </label>
        <input className='form-control' name='table_name' />
        <label className='form-label' htmlFor='capacity'>
          Capacity
        </label>
        <input className='form-control' name='capacity' />
        <button type='submit' className='btn btn-warning'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TableForm;
