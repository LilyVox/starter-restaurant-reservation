import React from 'react';
import ErrorAlert from './ErrorAlert';
/**
 * @param errors an array of strings
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlertDisplay({ incErrors }) {
  let doHaveErrors = incErrors && incErrors.length > 0;
  if (doHaveErrors) {
    let condition = incErrors.length > 1;
    if (!condition) return <ErrorAlert error={{ error: incErrors[0] }} />;
    return incErrors.map((error, index) => <ErrorAlert key={index} error={{ error: error }} />);
  }
  return null;
}

export default ErrorAlertDisplay;
