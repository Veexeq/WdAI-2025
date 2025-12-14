import { Product } from './Product'

function NewCart() {
    const productNames: string[] = ['produkt1', 'produkt2', 'produkt3', 'produkt4', 'produkt5'];
    
    // An array of 'JSX.Element's. TS can infer the type on its own
    const productElements = productNames.map((name) => <Product key={name} name={name}/>);
    
    return (
      <>
        <h1>Twój nowy koszyk:</h1>
        {productElements}
      </>  
    );
}

export default NewCart;
