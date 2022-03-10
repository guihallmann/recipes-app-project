import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getNationalities } from '../services/API';

function FoodsByNationalities() {
  const [nationalities, setNationalities] = useState([]);

  const getFoodNationalities = async () => {
    const foodNationalities = await getNationalities();
    setNationalities(foodNationalities);
  };

  useEffect(() => {
    getFoodNationalities();
  }, []);

  return (
    <div>
      <Header title="Explore Nationalities" />
      <select id="nationalities" data-testid="explore-by-nationality-dropdown">
        <option value="All" data-testid="All-option">All</option>
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
