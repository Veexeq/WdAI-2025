import React, { useState } from "react";

function Login() {

  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleFirstPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstPassword(e.target.value);
  };

  const handleSecondPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondPassword(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const isButtonDisabled: boolean = firstPassword === '' ||
                                    secondPassword === '' ||
                                    username === ''

  const handleLogin = () => {
    if (firstPassword === secondPassword) {
      alert('Zalogowano poprawnie');
    } else {
      alert('Hasła nie są zgodne');
    }
  };

  return (
    <>
      <label htmlFor='username'>Username:</label><br />
      <input 
        type='text'
        id='username'
        placeholder='Enter your username'
        value={username}
        onChange={handleUsernameChange}
      /><br /><br />

      <label htmlFor='first-password'>Password:</label><br />
      <input 
        type='password'
        id='first-password'
        placeholder='Enter your password'
        value={firstPassword}
        onChange={handleFirstPasswordChange}
      /><br /><br />

      <label htmlFor='second-password'>Reenter your password:</label><br />
      <input 
        type='password'
        id='second-password'
        placeholder='Enter your password once again'
        value={secondPassword}
        onChange={handleSecondPasswordChange}
      /><br /><br />

      <input 
        type='button'
        value='Login'
        disabled={isButtonDisabled}
        onClick={handleLogin}
      />
    </>
  );
}

export default Login;
