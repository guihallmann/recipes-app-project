import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import { MAX_LIST_SIZE } from '../data/consts';

function Foods() {
  const { foodsList } = useContext(RecipesContext);
  return (
    <section>
      <Header title="Foods" />
      <div>
        {foodsList.map((food, index) => (index <= MAX_LIST_SIZE && <Card
          key={ food.idMeal }
          index={ index }
          image={ food.strMealThumb }
          name={ food.strMeal }
        />
        ))}
      </div>
      <Footer />
    </section>
  );
}

export default Foods;
