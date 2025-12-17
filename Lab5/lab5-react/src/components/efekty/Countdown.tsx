import { useEffect, useState } from 'react';
import styles from './countdown.module.css'

function Countdown() {

  const [counter, setCounter] = useState(150);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState('START');

  function clicked() {
    if (isRunning) {
      setIsRunning(false);
      setButtonText('START');
    } else {
      setIsRunning(true);
      setButtonText('STOP');
      // setCounter(150);
    }
  }

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    // Run the countdown
    const intervalId = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 0) {
          setIsRunning(false);
          setButtonText('ODLICZANIE ZAKOŃCZONE');
          return 0;
        }
        return prev - 1;
      });
    }, 100);

    return () => clearInterval(intervalId);

  }, [isRunning]);

  function parseCounter() {
    return String(counter / 10) + (counter % 10 === 0 ? '.0' : '');
  }

  return (
    <>
      <div className={styles.countdownText}>{parseCounter()}</div>
      <button 
        type='button' 
        onClick={clicked} 
        disabled={buttonText === 'ODLICZANIE ZAKOŃCZONE' ? true : false}
      >{buttonText}</button>
    </>
  );
}

export default Countdown;
