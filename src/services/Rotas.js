import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import Profile from '../pages/Profile';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import FoodsByIngredient from '../pages/FoodsByIngredient';
import FoodsByNationalities from '../pages/FoodsByNationalities';
import Details from '../pages/Details';
import DrinksByIngredient from '../pages/DrinksByIgredient';
import NotFound from '../pages/NotFound';

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
        <Route exact path="/explore/drinks/nationalities" component={ NotFound } />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ DrinksByIngredient }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ FoodsByNationalities }
        />
        <Route
          exact
          path="/foods/:id"
          render={ (props) => <Details { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => <Details { ...props } /> }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
