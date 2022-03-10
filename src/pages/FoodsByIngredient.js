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
      {!isloading && ingredients.map(({ idIngredient, strIngredient }, index) => (
        <IngredientCard
          key={ idIngredient }
          index={ index }
          image={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
          name={ strIngredient }
          isItFood
        />
      ))}
      <Footer />
    </div>
  );
}

export default FoodsByIngredient;
