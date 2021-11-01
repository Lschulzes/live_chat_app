import React from 'react';
import { Route, Switch } from 'react-router';
import AdminRoom from './pages/AdminRoom';
import Home from './pages/Home';
import Room from './pages/Room';

export default function Routes() {
  return (
    <Switch>
      <Route path='/room/:id'>
        <Room />
      </Route>
      <Route path='/admin/room/:id'>
        <AdminRoom />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  );
}
