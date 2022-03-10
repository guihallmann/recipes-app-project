import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import { MAX_LIST_SIZE, MAX_NUMBER_BUTTON } from '../data/consts';
import {
  getTwelveMeals,
  getMealCategories,
  searchByMealCategories,
} from '../services/API';

function Foods() {
  const { foodsList, setFoodsList } = useContext(RecipesContext);
  const [mealCategories, setMealCategories] = useState([]);
  const [toggleFilter, setToggleFilter] = useState('');
  const { fromExploreIngredient, setFromExploreIngredient } = useContext(RecipesContext);

  const getMeals = async () => {
    if (fromExploreIngredient) {
      setFromExploreIngredient(false);
    } else {
      const meals = await getTwelveMeals();
      setFoodsList(meals);
      setMealCategories(await getMealCategories());
    }
  };

  const handleClickFilter = async ({ target }) => {
    if (toggleFilter === target.textContent || target.textContent === 'All') {
      getMeals();
      setToggleFilter('');
    } else {
      setFoodsList(await searchByMealCategories(target.textContent));
      setToggleFilter(target.textContent);
    }
  };

  useEffect(() => {
    getMeals();
  }, []);

  return (
    <section>
      <Header title="Foods" />
      <div>
        <button
          type="button"
          onClick={ handleClickFilter }
          data-testid="All-category-filter"
        >
          All
        </button>
        {mealCategories.map((category, index) => (
          index <= MAX_NUMBER_BUTTON
          && (
            <button
              type="button"
              key={ category }
              data-testid={ `${category}-category-filter` }
              onClick={ handleClickFilter }
            >
              {category}
            </button>)
        ))}

      </div>
      <div>
        {foodsList.map((food, index) => (index <= MAX_LIST_SIZE
          && (
            <Link to={ `/foods/${food.idMeal}` }>
              <Card
                key={ food.idMeal }
                index={ index }
                image={ food.strMealThumb }
                name={ food.strMeal }
              />
            </Link>)
        ))}
      </div>
      <Footer />
    </section>
  );
}

export default Foods;
