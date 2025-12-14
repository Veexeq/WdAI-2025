import { useState } from 'react';
import styles from './counter.module.css'

function Counter() {
  const [counter, setCounter] = useState(0); 

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div className={styles.counterWrapper}>
      <p className={styles.counterText} id="counterText">{counter}</p>
      <button className={styles.counterButton} onClick={incrementCounter}>Click me</button>
    </div>
  );

}

export default Counter;
