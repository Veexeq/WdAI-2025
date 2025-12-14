import { Product } from './Product'

function Cart() {
    // const productNames: string[] = ['produkt1', 'produkt2', 'produkt3', 'produkt4', 'produkt5'];
    return (
        <>
            <h1>Twój koszyk: </h1>
            <Product name='produkt1' />
            <Product name='produkt2' />
            <Product name='produkt3' />
            <Product name='produkt4' />
            <Product name='produkt5' />
        </>
    );
}

export default Cart;
