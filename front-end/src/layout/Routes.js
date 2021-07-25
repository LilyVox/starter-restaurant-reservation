import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import NotFound from './subComponents/NotFound';
import ReservationPage from '../reservations/main';
import SeatReservation from '../reservations/SeatReservation';
import { updateReservationStatus } from '../reservations/reservation.service';

import TableCUMain from '../tables/main';
import SearchHomepage from '../search/main';
import { today } from '../utils/date-time';
import useQuery from '../utils/useQuery';

/**
 * Defines all the routes for the application.
 *
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const date = query.get('date');
  const cancelHandler = async (reservation_id) => {
    if (window.confirm('Do you want to cancel this reservation? This cannot be undone.')) {
      await updateReservationStatus(reservation_id, 'cancelled');
    }
  };
  return (
    <Switch>
      <Route exact={true} path='/'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route exact={true} path='/reservations/new'>
        <ReservationPage />
      </Route>
      <Route exact={true} path='/reservations'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route exact={true} path='/search'>
        <SearchHomepage cancelHandler={cancelHandler} />
      </Route>
      <Route exact={true} path='/reservations/:reservation_id/seat'>
        <SeatReservation />
      </Route>
      <Route exact={true} path='/tables/new'>
        <TableCUMain />
      </Route>
      <Route exact={true} path='/tables'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route path='/dashboard'>
        <Dashboard date={date ? date : today()} cancelHandler={cancelHandler} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
