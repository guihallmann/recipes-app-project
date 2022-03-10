import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function FoodsByNationalities() {
  const [nationalities, setNationalities] = useState([]);

  const getFoodNationalities = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await response.json();
    const foodNationalities = data.meals;
    setNationalities(foodNationalities);
  };

  useEffect(() => {
    getFoodNationalities();
  }, []);

  return (
    <div>
      <Header title="Explore Nationalities" />
      {console.log(nationalities)}
      <select id="nationalities" data-testid="explore-by-nationality-dropdown">
        <option value="0" data-testid="All-option">All</option>
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
      <Footer />
    </div>
  );
}

export default FoodsByNationalities;
