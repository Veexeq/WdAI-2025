import type { WelcomeObject } from "../types/welcomeComponent";

function Welcome(props: WelcomeObject) {
    return (
        <>
            <h1>Hello, {props.name}.</h1>
            <h2>You are {props.age} years old.</h2>
        </>
    );
}

export default Welcome