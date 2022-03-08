import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function ExploreDrinks() {
  const history = useHistory();
  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => (history.push('/explore/drinks/ingredients')) }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick=""
        >
          Surprise me!
        </button>
      </div>
      <p>Footer</p>
    </div>
  );
}

export default ExploreDrinks;
