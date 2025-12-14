import { useState } from "react";

function Form() {
  const [inputText, setInputText] = useState('');

  // Source: https://stackoverflow.com/questions/40676343/typescript-input-onchange-event-target-value
  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }
  
  return (
    <form>
      <div>{inputText === '' ? 'Enter your text...' : inputText}</div><br />
      <label htmlFor='inputField'>Your input:</label><br />
      <input 
        type='text' 
        id='inputField' 
        placeholder='Enter your text...'
        
        // Controlled input: inside text is dictated by value of inputText,
        // which is dictated by onChange
        // The purpose of this is to not have an HTML element that lives
        // on its own and isn't supervised by React's state mechanism
        value={inputText}

        onChange={handleTextChange}
      />
    </form>
  );
}

export default Form;
