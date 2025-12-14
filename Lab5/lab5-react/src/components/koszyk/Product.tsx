export interface productProp {
    name: string
}

export function Product(props: productProp) {
    return (
        <p>Nazwa produktu: {props.name}</p>
    );
}

export default Product;
