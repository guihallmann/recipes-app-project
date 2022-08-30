import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';
import '../styles/Buttons.css';

function Profile() {
  const { setSearchBarStatus } = useContext(RecipesContext);

  const user = localStorage.getItem('user');
  const objEmail = JSON.parse(user);
  const userObj = objEmail || 'email@null.com';
  const history = useHistory();

  const handleClick = (path) => {
    if (path === '/') {
      localStorage.clear();
    }
    history.push(path);
  };

  useEffect(() => {
    setSearchBarStatus(false);
  }, []);

  return (
    <div>
      <Header title="Profile" />
      <h2 className="email-text" data-testid="profile-email">{userObj.email}</h2>
      <section className="buttons-section">
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => handleClick('/done-recipes') }
          className="profile-btn"
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => handleClick('/favorite-recipes') }
          className="profile-btn"
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => handleClick('/') }
          className="profile-btn"
        >
          Logout
        </button>
      </section>
      <Footer />
    </div>
  );
}
export default Profile;
