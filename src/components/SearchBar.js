import React from 'react';

function SearchBar() {
  return (
    <section>
      <input
        placeholder="Search Recipe"
        className="search-input"
        type="text"
        data-testid="search-input"
      />
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="search-radio"
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          name="search-radio"
        />
      </label>
      <label htmlFor="first-letter">
        First Letter
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter"
          name="search-radio"
        />
      </label>
      <buton
        type="button"
        data-testid="exec-search-btn"
      >
        Search
      </buton>
    </section>
  );
}

export default SearchBar;
