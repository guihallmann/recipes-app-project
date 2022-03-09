import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
  getMealName,
  getMealIngredient,
  getMealLetter,
  getDrinkName,
  getDrinkIngredient,
  getDrinkLetter,
  // getDrinkIngredient,
  // getDrinkLetter,
  // getDrinkName,
} from '../services/API';
import { FIRST_LETTER, NAME, INGREDIENT } from '../data/consts';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [radioText, setRadioText] = useState('Ingredient');
  const history = useHistory();
  const { pathname } = history.location;
  const handleChange = ({ target }) => {
    setSearchText(target.value);
  };

  const foodRequest = () => {
    if (radioText === NAME) getMealName(searchText);
    if (radioText === INGREDIENT) getMealIngredient(searchText);
    if (radioText === FIRST_LETTER && searchText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      getMealLetter(searchText);
    }
  };

  const drinkRequest = () => {
    if (radioText === NAME) getDrinkName(searchText);
    if (radioText === INGREDIENT) getDrinkIngredient(searchText);
    if (radioText === FIRST_LETTER && searchText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      getDrinkLetter(searchText);
    }
  };

  const handleClick = () => {
    if (pathname === '/foods') foodRequest();
    if (pathname === '/drinks') drinkRequest();
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
