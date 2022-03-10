import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/Details.css';
import { getMealDetails } from '../services/API';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/blackHeartIcon.svg';

function Details(props) {
  const { match: { params: { id } } } = props;
  const [mealDetails, setMealDetails] = useState([]);
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    const request = async (mealId) => {
      const apiResult = await getMealDetails(mealId);
      setMealDetails(apiResult.meals[0]);
    };
    request(id);
  }, []);
  useEffect(() => {
    const handleEntries = () => {
      const entriesArr = Object.entries(mealDetails);
      const newArr = entriesArr.filter((pos) => pos[0].includes('strIngredient')
        || pos[0].includes('strMeasure'))
        .filter((pos) => pos[1] !== '' && pos[1] !== null)
        .map((pos) => pos[1]);
      const SIZE = (newArr.length) / 2;
      const firsHalf = newArr.map((pos, i) => i < SIZE && pos)
        .filter((pos) => pos !== false);
      const secondHalf = newArr.map((pos, i) => i >= SIZE && pos)
        .filter((pos) => pos !== false);
      console.log(firsHalf);
      console.log(secondHalf);
      for (let i = 0; i < SIZE; i += 1) {
        recipe.push(`-${firsHalf[i]} -${secondHalf[i]}`);
      }
      setRecipe(recipe);
      // console.log('teste');
    };
    handleEntries();
  }, []);
  return (
    <section>
      <img
        className="mealImg"
        src={ mealDetails.strMealThumb }
        alt={ `${mealDetails.strMeal}` }
      />
      <h1>{mealDetails.strMeal}</h1>
      <h2>{mealDetails.strCategory}</h2>
      <section>
        <button type="button">
          <img src={ shareIcon } alt="shareIcon" data-testid="share-btn" />
        </button>
        <button type="button">
          <img src={ favIcon } alt="favIcon" data-testid="favorite-btn" />
        </button>
      </section>
      {recipe.length !== 0 && recipe.map((rec, i) => (
        <div key={ i }>
          <span key={ i }>{ rec }</span>
          <span>{ }</span>
        </div>
      ))}
    </section>
  );
}
Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Details;
