import { useState } from "react";

function Password() {

  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');

  let message = '';
  if (firstPassword === '' && secondPassword === '') {
    message = 'Proszę wprowadzić hasło';
  } else if (firstPassword === secondPassword) {
    message = '';
  } else {
    message = 'Hasła nie są zgodne';
  }

  const handleFirstPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstPassword(e.target.value);
  };

  const handleSecondPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondPassword(e.target.value);
  };

  return (
    <>
      <div>{message}</div><br />

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
      />
    </>
  );
}

export default Password;
