import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getRandomDrink } from '../services/API';

function ExploreDrinks() {
  const history = useHistory();

  const randomDrink = async () => {
    const data = await getRandomDrink();
    const drinkId = data[0].idDrink;
    history.push(`/drinks/${drinkId}`);
  };

  return (
    <div>
      <Header title="Explore Drinks" />
      <div className="category">
        <button
          type="button"
          className="default-btn"
          data-testid="explore-by-ingredient"
          onClick={ () => (history.push('/explore/drinks/ingredients')) }
        >
          By Ingredient
        </button>
        <button
          type="button"
          className="default-btn"
          data-testid="explore-surprise"
          onClick={ randomDrink }
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
