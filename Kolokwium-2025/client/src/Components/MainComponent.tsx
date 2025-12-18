import { useState } from "react";
import type { I_Pojemnik } from "../types/pojemnik";
import Pojemnik from "./Pojemnik";
import styles from './maincomponent.module.css'
// import DodajPojemnik from "./DodajPojemnik";


// Formularz
import stylesF from './dodajpojmnik.module.css'

const MAX_POZIOM = 10;

const testingContainers: I_Pojemnik[] = [
  {
    currWaterLevel: 9,
    maxWaterLevel: MAX_POZIOM,
    name: 'Testowy pojemnik 0',
    id: 0
  },
  {
    currWaterLevel: 0,
    maxWaterLevel: MAX_POZIOM,
    name: 'Testowy pojemnik 1',
    id: 1
  },
  // {
  //   currWaterLevel: 9,
  //   maxWaterLevel: MAX_POZIOM,
  //   name: 'Testowy pojemnik 2',
  //   id: 2
  // }
];

function MainComponent() {
  
  const [containers, setContainers] = useState<I_Pojemnik[]>(testingContainers);

  // const testingObject: I_Pojemnik = {
  //   currWaterLevel: 5,
  //   maxWaterLevel: MAX_POZIOM,
  //   name: 'Testowy pojemnik',
  //   id: 0
  // };

  // --- FORMULARZE ---

  const [nameField, setNameField] = useState('');
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameField(e.target.value)
  };

  const incrementLevel = () => {
    if (initialLevel < MAX_POZIOM) {
      setInitialLevel(initialLevel + 1);
    }
  }

  const decrementLevel = () => {
    if (initialLevel > 0) {
      setInitialLevel(initialLevel - 1);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextId = containers[containers.length - 1].id;
    
    setContainers(prev => ([...prev, {
      currWaterLevel: initialLevel,
      maxWaterLevel: MAX_POZIOM,
      name: nameField,
      id: nextId
    }]));

  }

  const [initialLevel, setInitialLevel] = useState(0);

  // --- FORMULARZE ---

  // Dolewka
  const incrementLevelD = (level: number) => {
    return (level === MAX_POZIOM ? MAX_POZIOM : level + 1);
  }

  const handleDolewka = () => {
    const prevState = containers.slice();
    const newState: I_Pojemnik[] = [];
    for (let i = 0; i < prevState.length; i++) {
      const prevObj = prevState[i];
      prevObj.currWaterLevel = incrementLevelD(prevObj.currWaterLevel);
      console.log(prevObj);
    }
    setContainers(newState);
  }

  const handleFetch = async () => {
    const prom = await fetch('https://dummyjson.com/recipes');
    const data = await prom.json();
    

    console.log(data);
    setNameField(data.recipes[Math.floor(Math.random() * 29)].name);
  
  }

  return (
    <>
      {/* 
      --TESTING--
      <Pojemnik 
        currWaterLevel={testingObject.currWaterLevel}
        maxWaterLevel={testingObject.maxWaterLevel}
        name={testingObject.name}
        id={testingObject.id}
      /> */}
        <div className={styles.wrapper}>
          {
            containers.map((entry, idx) => (
              <>
                <Pojemnik 
                  key={idx}
                  currWaterLevel={entry.currWaterLevel}
                  maxWaterLevel={entry.maxWaterLevel}
                  name={entry.name}
                  id={entry.id}
                />
              </>
            ))
          }
        </div>

        {/* FORMULARZE */}
        <div className={stylesF.wrapper}>
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

            <button type='button' onClick={handleFetch}>Losuj</button>
          </form>
        </div>
        {/* FORMULARZE */}
        {/* DOLEWKA */}
          <div className={styles.wrapper}>
            <button 
              type='button'
              onClick={handleDolewka}
            >DOLEWKA
            </button>
          </div>
        {/* DOLEWKA */}
    </>
  );
}

export default MainComponent;
