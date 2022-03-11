import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const user = localStorage.getItem('user');
  const userObj = JSON.parse(user);
  const history = useHistory();

  const handleDoneButton = () => {
    history.push('/done-recipes');
  };

  const handleFavoriteButton = () => {
    history.push('/favorite-recipes');
  };

  const handleLogoutButton = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" />
      <h2 data-testid="profile-email">{userObj.email}</h2>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ handleDoneButton }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ handleFavoriteButton }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ handleLogoutButton }
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}
export default Profile;
