import React from 'react';
import { Link } from 'react-router-dom';
import NavLinkItem from '../subComponents/NavLinkItem';

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element} the menu.
 */

function Menu() {
  return (
    <nav className='navbar navbar-dark align-items-start p-0'>
      <div className='container-fluid d-flex flex-column p-0'>
        <Link
          className='navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0'
          to='/'>
          <div className='sidebar-brand-text mx-3'>
            <span>Periodic Tables</span>
          </div>
        </Link>
        <hr className='sidebar-divider my-0' />
        <ul className='nav navbar-nav text-light' id='accordionSidebar'>
          <NavLinkItem to='/dashboard' icon='oi-dashboard' text='Dashboard'/>
          <NavLinkItem to='/search' icon='oi-magnifying-glass' text='Search'/>
          <NavLinkItem to='/reservations/new' icon='oi-plus' text='New Reservation'/>
          <NavLinkItem to='/tables/new' icon='oi-layers' text='New Table'/>
        </ul>
        <div className='text-center d-none d-md-inline'>
          <button className='btn rounded-circle border-0' id='sidebarToggle' type='button' />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
