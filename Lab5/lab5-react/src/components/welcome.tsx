import type { WelcomeObject } from "../types/welcomeComponent";

function Welcome(props: WelcomeObject) {

    const sex: string = props.name.slice(-1) === 'a' ? 'F' : 'M';

    return (
        <>
            <h1>Hello, {props.name}.</h1>
            <h2>You are {props.age} years old.</h2>
            <h3>Your sex is {sex}.</h3>
        </>
    );
}

export default Welcome