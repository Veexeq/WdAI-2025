function Welcome(props: {name: string, age: number}) {
    return (
        <>
            <h1>Hello, {props.name}.</h1>
            <h2>You are {props.age} years old.</h2>
        </>
    );
}

export default Welcome