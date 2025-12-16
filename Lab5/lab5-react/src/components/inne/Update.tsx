import { useState } from "react";

function Update() {
  const [info, setInfo] = useState({name: 'Pomidor', price: 50});
  
  const doublePrice = () => {
    setInfo(prev => ({...prev, price: prev.price * 2}));
  };
  
  return (
    <>
      <div>
        <p>Aktualnie {info.name.toLowerCase()} kosztuje {info.price}.</p>
      </div>
      <button onClick={doublePrice}>Zmień cenę</button>
    </>
  );
}

export default Update;
