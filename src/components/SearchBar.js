import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import {
  getMealName,
  getMealIngredient,
  getMealLetter,
  getDrinkName,
  getDrinkIngredient,
  getDrinkLetter,
} from '../services/API';
import { FIRST_LETTER, NAME, INGREDIENT } from '../data/consts';

function SearchBar() {
  const { setFoodsList, setDrinksList } = useContext(RecipesContext);
  const [searchText, setSearchText] = useState('');
  const [radioText, setRadioText] = useState('Ingredient');
  const history = useHistory();
  const { pathname } = history.location;
  const handleChange = ({ target }) => {
    setSearchText(target.value);
  };

  const foodRequest = async () => {
    if (radioText === NAME) {
      const apiResult = await getMealName(searchText);
      return apiResult;
    }
    if (radioText === INGREDIENT) {
      const apiResult = await getMealIngredient(searchText);
      return apiResult;
    }
    if (radioText === FIRST_LETTER && searchText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const apiResult = await getMealLetter(searchText);
      return apiResult;
    }
  };

  const drinkRequest = async () => {
    if (radioText === NAME) {
      const apiResult = await getDrinkName(searchText);
      return apiResult;
    }
    if (radioText === INGREDIENT) {
      const apiResult = await getDrinkIngredient(searchText);
      return apiResult;
    }
    if (radioText === FIRST_LETTER && searchText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const apiResult = await getDrinkLetter(searchText);
      return apiResult;
    }
  };

  const foodPath = async () => {
    if (pathname === '/foods') {
      const apiReturn = await foodRequest();
      if (apiReturn && apiReturn.meals === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      if (apiReturn && apiReturn.meals.length === 1) {
        history.push(`/foods/${apiReturn.meals[0].idMeal}`);
      }
      if (apiReturn && apiReturn.meals.length > 1) {
        setFoodsList(apiReturn.meals);
      }
    }
  };

  const drinkPath = async () => {
    if (pathname === '/drinks') {
      const apiReturn = await drinkRequest();
      if (apiReturn && apiReturn.drinks === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      if (apiReturn && apiReturn.drinks.length === 1) {
        history.push(`/drinks/${apiReturn.drinks[0].idDrink}`);
      }
      if (apiReturn && apiReturn.drinks.length > 1) {
        setDrinksList(apiReturn.drinks);
      }
    }
  };

  const handleClick = () => {
    foodPath();
    drinkPath();
    // if (pathname === '/foods') {
    //   const apiReturn = await foodRequest();
    //   if (apiReturn && apiReturn.meals.length === 1) {
    //     history.push(`/foods/${apiReturn.meals[0].idMeal}`);
    //   }
    //   if (apiReturn && apiReturn.meals.length > 1) {
    //     setFoodsList(apiReturn.meals);
    //   }
    // }
    // if (pathname === '/drinks') {
    //   const apiReturn = await drinkRequest();
    //   if (apiReturn && apiReturn.drinks.length === 1) {
    //     history.push(`/drinks/${apiReturn.drinks[0].idDrink}`);
    //   }
    //   if (apiReturn && apiReturn.drinks.length > 1) {
    //     setDrinksList(apiReturn.drinks);
    //   }
    // }
  };

  return (
    <section className="search-filter">
      <input
        placeholder="Search Recipe"
        className="search-input"
        type="text"
        data-testid="search-input"
        value={ searchText }
        onChange={ handleChange }
      />
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="search-radio"
          value={ radioText }
          onChange={ () => setRadioText(INGREDIENT) }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          name="search-radio"
          onChange={ () => setRadioText(NAME) }
        />
      </label>
      <label htmlFor="first-letter">
        First Letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter"
          name="search-radio"
          onChange={ () => setRadioText(FIRST_LETTER) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </section>
  );
}

export default SearchBar;
