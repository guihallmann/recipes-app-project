import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getMealIngredient, getDrinkIngredient } from '../services/API';
import RecipesContext from '../context/RecipesContext';
import '../styles/ExploreIngredient.css';

function IngredientCard({ index, image, name, isItFood }) {
  const history = useHistory();
  const {
    setDrinksList,
    setFoodsList,
    setFromExploreIngredient,
  } = useContext(RecipesContext);

  const setMeal = async (meal) => {
    const apiResult = await getMealIngredient(meal);
    setFoodsList(apiResult.meals);
    setFromExploreIngredient(true);
    history.push('/foods');
  };

  const setDrink = async (drink) => {
    const apiResult = await getDrinkIngredient(drink);
    setDrinksList(apiResult.drinks);
    setFromExploreIngredient(true);
    history.push('/drinks');
  };

  const setIngredient = (param) => {
    const ingredient = param[1]
      ? setMeal(param[0])
      : setDrink(param[0]);
    return ingredient;
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => setIngredient([name, isItFood]) }
        data-testid={ `${index}-ingredient-card` }
        className="card-button"
      >
        <img
          src={ image }
          alt={ `ingredient-card-${index}` }
          data-testid={ `${index}-card-img` }
        />
        <h3 className="recipe-name" data-testid={ `${index}-card-name` }>{name}</h3>
      </button>
    </div>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  isItFood: PropTypes.bool,
}.isRequired;

export default IngredientCard;
