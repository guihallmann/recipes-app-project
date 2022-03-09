import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';

function DrinksByIngredient() {
  const CONST_12 = 12;
  const [ingredients, setIngredients] = useState([]);
  const [isloading, setIsLoading] = useState([true]);

  const getDrinkIngredients = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    const drinkIngredients = data.drinks;
    const twelveDrinkIngredients = drinkIngredients.splice(0, CONST_12);
    setIngredients(twelveDrinkIngredients);
    setIsLoading(false);
  };

  useEffect(() => {
    getDrinkIngredients();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" />
      {!isloading && ingredients.map((ingredient, index) => (
        <IngredientCard
          key={ ingredient.strIngredient1 }
          index={ index }
          image={ ingredient.strIngredient1 }
          name={ ingredient.strIngredient1 }
        />
      ))}
      <Footer />
    </div>
  );
}

export default DrinksByIngredient;
