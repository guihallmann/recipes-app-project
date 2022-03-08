import React, { useState } from 'react';

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [radioText, setRadioText] = useState('Ingredient');
  const handleChange = ({ target }) => {
    setSearchText(target.value);
  };

  async function getIngredient(ingredient) {
    const response = await (fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`));
    const data = await (response).json();
    console.log(data);
  }

  const handleClick = () => {
    getIngredient(searchText);
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
          onChange={ () => setRadioText('First Letter') }
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
