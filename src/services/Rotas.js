import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Foods from '../pages/Foods';

function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/foods" component={ Foods } />
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
