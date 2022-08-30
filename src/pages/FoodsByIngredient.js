import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import { getAllMealIngredients } from '../services/API';
import '../styles/ExploreIngredient.css';

function FoodsByIngredient() {
  const CONST_12 = 12;
  const [ingredients, setIngredients] = useState([]);
  const [isloading, setIsLoading] = useState([true]);

  const getFoodIngredients = async () => {
    const foodIngredients = await getAllMealIngredients();
    const twelveFoodIngredients = foodIngredients.slice(0, CONST_12);
    setIngredients(twelveFoodIngredients);
    setIsLoading(false);
  };

  useEffect(() => {
    getFoodIngredients();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" />
      <section className="ingredients-list">
        {!isloading && ingredients.map(({ idIngredient, strIngredient }, index) => (
          <IngredientCard
            key={ idIngredient }
            index={ index }
            image={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
            name={ strIngredient }
            isItFood
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default FoodsByIngredient;
