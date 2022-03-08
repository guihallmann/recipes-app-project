import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Explore from '../pages/Explore';
import Profile from '../pages/Profile';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import FoodsByIngredient from '../pages/FoodsByIngredient';
import FoodsByNationalities from '../pages/FoodsByNationalities';
import Drinks from '../pages/Drinks';

function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/ingredients" component={ FoodsByIngredient } />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ FoodsByNationalities }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
