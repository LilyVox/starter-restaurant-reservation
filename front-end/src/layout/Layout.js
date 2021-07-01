import React from 'react';
import Menu from './menu/Menu';
import Routes from './menu/Routes';

import './Layout.css';

/**
 * Defines the main layout of the application.
 *
 * @returns {JSX.Element} the layout of the page.
 */
function Layout() {
  return (
    <div className='container-fluid bg-secondary'>
      <div className='row h-100'>
        <div className='col-md-2 side-bar'>
          <Menu />
        </div>
        <div className='col'>
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
