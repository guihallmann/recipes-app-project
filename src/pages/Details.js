import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/Details.css';
import { getMealDetails } from '../services/API';
import shareIcon from '../images/shareIcon.svg';
import favIcon from '../images/blackHeartIcon.svg';

function Details(props) {
  const { match: { params: { id } } } = props;
  const [mealDetails, setMealDetails] = useState([]);
  useEffect(() => {
    const request = async (mealId) => {
      const apiResult = await getMealDetails(mealId);
      setMealDetails(apiResult.meals[0]);
    };
    request(id);
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
