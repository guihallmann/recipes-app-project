import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Foods from '../pages/Foods';
import Explore from '../pages/Explore';


function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/explore" component={ Explore } />
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
