import styles from './counter.module.css'

function Counter() {
  return (
    <div className={styles.counterWrapper}>
      <p className={styles.counterText} id="counterText">0</p>
      <button className={styles.counterButton}>Click me</button>
    </div>
  );

}

export default Counter;
