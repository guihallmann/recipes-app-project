import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import { MAX_LIST_SIZE, MAX_NUMBER_BUTTON } from '../data/consts';
import {
  getTwelveDrinks,
  getDrinkCategories,
  searchByDrinkCategories,
} from '../services/API';
import '../styles/Foods.css';

function Drinks() {
  const { drinksList, setDrinksList } = useContext(RecipesContext);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [toggleFilter, setToggleFilter] = useState('');
  const { fromExploreIngredient, setFromExploreIngredient,
    setSearchBarStatus } = useContext(RecipesContext);

  const getDrinks = async () => {
    if (fromExploreIngredient) {
      setFromExploreIngredient(false);
    } else {
      const drinks = await getTwelveDrinks();
      setDrinksList(drinks);
      setDrinkCategories(await getDrinkCategories());
    }
  };

  const handleClickFilter = async ({ target }) => {
    if (toggleFilter === target.textContent || target.textContent === 'All') {
      getDrinks();
      setToggleFilter('');
    } else {
      setDrinksList(await searchByDrinkCategories(target.textContent));
      setToggleFilter(target.textContent);
    }
  };

  useEffect(() => {
    getDrinks();
    setSearchBarStatus(false);
  }, []);

  return (
    <section>
      <Header title="Drinks" />
      <section className="filter-buttons">
        <button
          type="button"
          onClick={ handleClickFilter }
          data-testid="All-category-filter"
          className="filter-btn"
        >
          All
        </button>
        {drinkCategories.map((category, index) => (
          index <= MAX_NUMBER_BUTTON
          && (
            <button
              type="button"
              key={ category }
              data-testid={ `${category}-category-filter` }
              onClick={ handleClickFilter }
              className="filter-btn"
            >
              {category}
            </button>)
        ))}

      </section>
      <section className="cards-list">
        {drinksList.map((drink, index) => (index <= MAX_LIST_SIZE
          && (
            <Link className="link-style" to={ `/drinks/${drink.idDrink}` }>
              <Card
                key={ drink.idDrink }
                index={ index }
                image={ drink.strDrinkThumb }
                name={ drink.strDrink }
              />
            </Link>)
        ))}
      </section>
      <Footer />
    </section>
  );
}

export default Drinks;
