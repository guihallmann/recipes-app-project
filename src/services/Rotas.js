import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Explore from '../pages/Explore';
import Drinks from '../pages/Drinks';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoods from '../pages/ExploreFoods';

function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/header" component={ Header } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
