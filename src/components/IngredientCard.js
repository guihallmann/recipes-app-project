import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getMealIngredient, getDrinkIngredient } from '../services/API';
import RecipesContext from '../context/RecipesContext';

function IngredientCard({ index, image, name, isItFood }) {
  const history = useHistory();
  const { setFoodsList, setDrinksList } = useContext(RecipesContext);

  const setMeal = async (meal) => {
    const apiResult = await getMealIngredient(meal);
    setFoodsList(apiResult.meals);
    history.push('/foods');
  };

  const setDrink = async (drink) => {
    const apiResult = await getDrinkIngredient(drink);
    setDrinksList(apiResult.drinks);
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
      >
        <img
          src={ image }
          alt={ `ingredient-card-${index}` }
          data-testid={ `${index}-card-img` }
        />
        <span data-testid={ `${index}-card-name` }>{name}</span>
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
