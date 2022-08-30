import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRandomMeal } from '../services/API';

function ExploreFoods() {
  const history = useHistory();

  const randomFood = async () => {
    const data = await getRandomMeal();
    const foodId = await data[0].idMeal;
    history.push(`/foods/${foodId}`);
  };

  return (
    <div>
      <Header title="Explore Foods" />
      <section>
        <div className="category">
          <button
            type="button"
            className="default-btn"
            data-testid="explore-by-ingredient"
            onClick={ () => (history.push('/explore/foods/ingredients')) }
          >
            By Ingredient
          </button>
          <button
            type="button"
            className="default-btn"
            data-testid="explore-by-nationality"
            onClick={ () => (history.push('/explore/foods/nationalities')) }
          >
            By Nationality
          </button>
          <button
            type="button"
            className="default-btn"
            data-testid="explore-surprise"
            onClick={ randomFood }
          >
            Surprise me!
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
