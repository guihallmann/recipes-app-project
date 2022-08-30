import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Login.css';

function Login({ history }) {
  const [validEmailAndPassword, setValidEmailAndPassword] = useState(true);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const CONST_6 = 6;
  useEffect(() => {
    if (inputEmail.match(/\S+@\S+\.\S+/) && inputPassword.length > CONST_6) {
      setValidEmailAndPassword(false);
    } else { setValidEmailAndPassword(true); }
  }, [inputEmail, inputPassword]);

  const handleClickLogin = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    const StringifyEmail = JSON.stringify({ email: inputEmail });
    localStorage.setItem('user', StringifyEmail);
    history.push('/foods');
  };

  return (
    <section className="login-container">
      <h1 className="title-login">TrybeFood</h1>
      <input
        type="text"
        data-testid="email-input"
        name="email"
        onChange={ ({ target }) => setInputEmail(target.value) }
        className="email-input"
        placeholder="Email"
      />
      <input
        type="password"
        data-testid="password-input"
        name="password"
        onChange={ ({ target }) => setInputPassword(target.value) }
        className="pw-input"
        placeholder="Senha"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ validEmailAndPassword }
        onClick={ handleClickLogin }
        className={ validEmailAndPassword ? 'disabled-login-btn' : 'login-btn' }
      >
        Enter
      </button>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape,
}.isRequired;

export default Login;
