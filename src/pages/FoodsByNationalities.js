import React, { useState, useEffect, useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { getNationalities, getMealName } from '../services/API';
import { MAX_LIST_SIZE } from '../data/consts';
import RecipesContext from '../context/RecipesContext';
import '../styles/ExploreNationalities.css';

function FoodsByNationalities() {
  const [nationalities, setNationalities] = useState([]);
  const [dropdown, setDropdown] = useState('All');
  const { foodsList, setFoodsList } = useContext(RecipesContext);
  // const history = useHistory();

  const getFoodNationalities = async () => {
    const foodNationalities = await getNationalities();
    setNationalities(foodNationalities);
  };

  const getAllMeals = async () => {
    const allMeals = await getMealName('');
    setFoodsList(allMeals.meals);
  };

  const fetchFoodByNationality = async (nationality) => {
    const response = await
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`);
    const data = await response.json();
    setFoodsList(data.meals);
  };

  useEffect(() => {
    getFoodNationalities();
    getAllMeals();
  }, []);

  function handleSelect({ target }) {
    setDropdown(target.value);
    if (target.value === 'All') {
      getAllMeals();
    } else {
      fetchFoodByNationality(target.value);
    }
  }

  return (
    <div>
      <Header title="Explore Nationalities" />
      <select
        onChange={ handleSelect }
        id="nationalities"
        data-testid="explore-by-nationality-dropdown"
        value={ dropdown }
        className="select-input"
      >
        <option
          value="All"
          data-testid="All-option"
        >
          All
        </option>
        {
          nationalities.map(({ strArea }) => (
            <option
              key={ strArea }
              value={ strArea }
              data-testid={ `${strArea}-option` }
            >
              {strArea}
            </option>))
        }
      </select>
      <section className="cards-list">
        {foodsList.map((food, index) => (index <= MAX_LIST_SIZE
        && (
          <Link
            className="link-style"
            to={ `/foods/${food.idMeal}` }
            key={ food.idMeal }
          >
            <Card
              index={ index }
              image={ food.strMealThumb }
              name={ food.strMeal }
            />
          </Link>)
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default FoodsByNationalities;
