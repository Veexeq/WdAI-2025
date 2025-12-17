import { useEffect, useState } from 'react';
import styles from './counter.module.css'

function Counter() {
  const [counter, setCounter] = useState(0); 

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  // Empty array of dependencies, will run only when the page is loaded initially
  useEffect(() => {
    console.log('Hello, world.');
  }, []);

  // Logs counter state on update
  useEffect(() => {
    console.log(`Licznik zwiększył się do ${counter}`);
  }, [counter]);

  return (
    <div className={styles.counterWrapper}>
      <p className={styles.counterText} id="counterText">{counter}</p>
      <button className={styles.counterButton} onClick={incrementCounter}>Click me</button>
    </div>
  );
}

export default Counter;
