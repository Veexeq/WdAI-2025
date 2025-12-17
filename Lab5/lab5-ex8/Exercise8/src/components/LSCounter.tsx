// LSCounter = Local Storage Counter
import { useState } from 'react';
import styles from './lscounter.module.css'

function LSCounter() {
  const [counter, setCounter] = useState(0);

  const incrementer = () => {
    setCounter(prev => (prev + 1));
  }; 

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div id={styles.counterText}>{counter}</div>
        <button 
          type='button'
          className={styles.incrementer}
          onClick={incrementer}
          >Increment counter</button>
      </div>
    </div>
    
  );
}

export default LSCounter;
