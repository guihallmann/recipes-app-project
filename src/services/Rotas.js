import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Foods from '../pages/Foods';
import Login from '../pages/Login';
import Drinks from '../pages/Drinks';
import Explore from '../pages/Explore';
import Profile from '../pages/Profile';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import FoodsByIngredient from '../pages/FoodsByIngredient';
import FoodsByNationalities from '../pages/FoodsByNationalities';
import FoodDetails from '../pages/FoodDetails';
import DrinkDetails from '../pages/DrinkDetails';
import DrinksByIngredient from '../pages/DrinksByIgredient';
import NotFound from '../pages/NotFound';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import MealRecipeProgress from '../pages/MealRecipeProgress';
import DrinkRecipeProgress from '../pages/DrinkRecipeProgress';

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
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
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
          render={ (props) => <FoodDetails { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => <DrinkDetails { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ (props) => <MealRecipeProgress { ...props } /> }
        />
        <Route
          exact
          path="/drinks/:id/id-progress"
          render={ (props) => <DrinkRecipeProgress { ...props } /> }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Rotas;
