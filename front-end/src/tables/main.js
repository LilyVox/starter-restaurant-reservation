import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorAlert from '../layout/subComponents/ErrorAlert';
import { sendNewTable } from './tables.service';
import TableForm from './TableForm';

const tableObject = {
  table_name: '',
  capacity: 0,
};
/**
 *
 * @returns the table creation and update page
 */
function TableCUMain() {
  const [table, setTable] = useState(tableObject);
  const [tablesError, setTablesError] = useState([]);
  const history = useHistory();
  let errors = [];

  const submitHandler = async (e) => {
    e.preventDefault();
    let validToSend = await checkFields().then((errors) => {
      if (errors.length > 0) return false;
      return true;
    });
    if (validToSend) {
      await sendNewTable(table).then((response) => {
        if (response.ok) {
          history.push(`/dashboard`);
        }
      });
    }
  };
  /**
   * Validates the table info
   */
  async function checkFields() {
    if (table.table_name.length < 2) errors.push('table_name must be at least 2 characters long');
    if (table.capacity < 1) errors.push('capacity must be greater than 0');
    if (errors.length > 0) setTablesError([...errors]);
    else setTablesError([]);
    return errors;
  }
  const changeHandler = ({ target }) => {
    setTable({
      ...table,
      [target.name]: target.name === 'capacity' ? Number(target.value) : target.value,
    });
  };
  const cancelHandler = () => {
    history.goBack();
  };
  let errDisplay =
    tablesError.length > 0
      ? tablesError.map((error, index) => <ErrorAlert key={index} error={{ error: error }} />)
      : null;
  return (
    <main className='container-fluid justify-content-center'>
      <h1 className='my-0'>Create a new Table</h1>
      {errDisplay}
      <TableForm submitHandler={submitHandler} changeHandler={changeHandler} />
      <button className='btn btn-primary' onClick={cancelHandler}>
        Cancel
      </button>
    </main>
  );
}

export default TableCUMain;
