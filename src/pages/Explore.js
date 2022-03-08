import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Explore() {
  const history = useHistory();
  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ () => (history.push('/explore/foods')) }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => (history.push('/explore/drinks')) }
        >
          Explorar Bebidas
        </button>
      </div>
      <p>Footer</p>
    </div>
  );
}

export default Explore;
