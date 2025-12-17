import { useEffect, useState } from "react";

function Title() {
  const [titleInput, setTitleInput] = useState('');

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  useEffect(() => {
    document.title = titleInput !== '' ? titleInput : 'Default Title';
  }, [titleInput]);

  return (
    <form>
      <label htmlFor='titleInput'>Input the title for the page:</label><br />
      <input type='text' id='titleInput' value={titleInput} onChange={inputHandler}/>
    </form>
  );
}

export default Title;
