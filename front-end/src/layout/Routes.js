import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import NotFound from './subComponents/NotFound';
import SeatReservation from '../tables/SeatReservation';
import ReservationPage from '../reservations/main';
import TableMain from '../tables/main';
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
  return (
    <Switch>
      <Route exact={true} path='/'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route exact={true} path='/reservations/new'>
        <ReservationPage />
      </Route>
      <Route exact={true} path='/reservations/:reservation_id/seat'>
        <SeatReservation />
      </Route>
      <Route exact={true} path='/reservations/:reservation_id'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route exact={true} path='/reservations'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route exact={true} path='/tables/new'>
        <TableMain />
      </Route>
      <Route path='/dashboard'>
        <Dashboard date={date ? date : today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
