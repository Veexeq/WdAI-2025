import { useState } from 'react';
import styles from './dodajpojmnik.module.css'

function DodajPojemnik() {
  
  const [nameField, setNameField] = useState('');
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameField(e.target.value)
  };

  const incrementLevel = () => {
    setInitialLevel(initialLevel + 1);
  }

  const decrementLevel = () => {
    if (initialLevel > 0) {
      setInitialLevel(initialLevel - 1);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  }

  const [initialLevel, setInitialLevel] = useState(0);

  return (
    <>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={nameField}
            onChange={handleName}
          ></input>
          <p>{initialLevel}</p>

          <button type='button' onClick={incrementLevel}>+</button>
          <button type='button' onClick={decrementLevel}>-</button>

          <button type='submit'>Dodaj pojemnik</button>
        </form>
      </div>
    </>
  );
}

export default DodajPojemnik;
