import type { I_Pojemnik } from "../types/pojemnik";
import styles from './pojemnik.module.css'
import drop from './drop.png'

function Pojemnik(props: I_Pojemnik) {

  // tempArr: 1 = filled, 0 = empty
  const tempArr: number[] = Array(props.maxWaterLevel).fill(0);
  for (let i = 0; i < props.currWaterLevel; i++) {
    tempArr[props.maxWaterLevel - 1 - i] = 1;
  }

  console.log(tempArr);

  return (
    <>
      <div className={styles.card}>
        {
          tempArr.map((entry, idx) => (
            <>
              <div 
                style={{backgroundColor: entry === 0 ? 'white' : 'blue'}}
                key={idx}
              >
              {
                entry !== 0 && <img src={drop} alt='drop.png'></img>
              }
              </div>
            </>
          ))
        }
      </div>
    </>
  );
}

export default Pojemnik;
