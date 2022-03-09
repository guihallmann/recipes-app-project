import React, { useState } from 'react';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [radioText, setRadioText] = useState('Ingredient');
  const FIRST_LETTER = 'First Letter';
  const handleChange = ({ target }) => {
    setSearchText(target.value);
  };

  async function getIngredient(ingredient) {
    const response = await (fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`));
    const data = await (response).json();
    console.log(data);
  }

  async function getName(name) {
    const response = await (fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`));
    const data = await (response).json();
    console.log(data);
  }

  async function getLetter(letter) {
    const response = await (fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`));
    const data = await (response).json();
    console.log(data);
  }

  const handleClick = () => {
    if (radioText === 'Name') getName(searchText);
    if (radioText === 'Ingredient') getIngredient(searchText);
    if (radioText === FIRST_LETTER && searchText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      getLetter(searchText);
    }
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
          onChange={ () => setRadioText('Ingredient') }
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          name="search-radio"
          onChange={ () => setRadioText('Name') }
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
