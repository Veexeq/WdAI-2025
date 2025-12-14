import { useState } from 'react';
import Button from './Button'
import styles from './counter.module.css'

function NewCounter() {
  const [counter, setCounter] = useState(0);

  const handleIncrementation = () => {
    setCounter(counter + 1);
  };

  return (
    <div className={styles.counterWrapper}>
      <p className={styles.counterText}>{counter}</p>
      <Button onClick={handleIncrementation} className={styles.counterButton} />
    </div>
  );
}

export default NewCounter;
