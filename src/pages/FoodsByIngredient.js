import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';

function FoodsByIngredient() {
  const CONST_12 = 12;
  const [ingredients, setIngredients] = useState([]);
  const [isloading, setIsLoading] = useState([true]);

  const getFoodIngredients = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    const foodIngredients = data.meals;
    const twelveFoodIngredients = foodIngredients.splice(0, CONST_12);
    setIngredients(twelveFoodIngredients);
    setIsLoading(false);
  };

  useEffect(() => {
    getFoodIngredients();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" />
      {!isloading && ingredients.map((ingredient, index) => (
        <IngredientCard
          key={ ingredient.idIngredient }
          index={ index }
          image={ ingredient.strIngredient }
          name={ ingredient.strIngredient }
        />
      ))}
      <Footer />
    </div>
  );
}

export default FoodsByIngredient;
