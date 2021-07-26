import React from 'react';
import ErrorAlert from './ErrorAlert';
/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlertDisplay({ errors = [] }) {
  let condition = errors.length > 1;
  if(!condition) return (<ErrorAlert error={{ error: errors[0] }} />)
  let errorDisplay = errors.map((error, index) => <ErrorAlert key={index} error={{ error: error }} />);
  return !!condition && <div className='alert alert-danger m-2'>{errorDisplay}</div>;
}

export default ErrorAlertDisplay;
