import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
<<<<<<< HEAD
import Header from '../components/Header';
import Login from '../pages/Login';
=======
import Foods from '../pages/Foods';
>>>>>>> e5fe190c481c590ab11779b2a7a803c11b7adc3b
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import FoodsByIngredient from '../pages/FoodsByIngredient';
import FoodsByNationalities from '../pages/FoodsByNationalities';


function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
<<<<<<< HEAD
        <Route exact path="/header" component={ Header } />
        <Route exact path="/" component={ Login } />
=======
        <Route exact path="/foods" component={ Foods } />
>>>>>>> e5fe190c481c590ab11779b2a7a803c11b7adc3b
        <Route exact path="/explore" component={ Explore } />
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
