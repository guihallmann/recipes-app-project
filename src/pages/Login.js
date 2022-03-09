import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
  const [validEmailAndPassword, setValidEmailAndPassword] = useState(true);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const CONST_6 = 6;
  useEffect(() => {
    if (inputEmail.match(/\S+@\S+\.\S+/) && inputPassword.length > CONST_6) {
      setValidEmailAndPassword(false);
    }
  }, [inputEmail, inputPassword]);

  const handleClickLogin = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    const StringifyEmail = JSON.stringify({ email: inputEmail });
    localStorage.setItem('user', StringifyEmail);
    history.push('/foods');
  };

  return (
    <div>
      <input
        type="text"
        data-testid="email-input"
        name="email"
        onChange={ ({ target }) => setInputEmail(target.value) }
      />
      <input
        type="password"
        data-testid="password-input"
        name="password"
        onChange={ ({ target }) => setInputPassword(target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ validEmailAndPassword }
        onClick={ handleClickLogin }
      >
        Enter
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape,
}.isRequired;

export default Login;
