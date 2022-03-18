import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import { getAllDrinkIngredients } from '../services/API';
import '../styles/ExploreIngredient.css';

function DrinksByIngredient() {
  const CONST_12 = 12;
  const [ingredients, setIngredients] = useState([]);
  const [isloading, setIsLoading] = useState([true]);

  const getDrinkIngredients = async () => {
    const drinkIngredients = await getAllDrinkIngredients();
    const twelveDrinkIngredients = drinkIngredients.slice(0, CONST_12);
    setIngredients(twelveDrinkIngredients);
    setIsLoading(false);
  };
  useEffect(() => {
    getDrinkIngredients();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" />
      <section className="ingredients-list">
        {!isloading && ingredients.map(({ strIngredient1 }, index) => (
          <IngredientCard
            key={ strIngredient1 }
            index={ index }
            image={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            name={ strIngredient1 }
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default DrinksByIngredient;
