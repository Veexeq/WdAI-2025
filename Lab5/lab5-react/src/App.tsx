import './App.css'
import Welcome from './components/welcome';
import type { WelcomeObject } from './types/welcomeComponent';

function App() {

  const welcomeObject: WelcomeObject = {
    name: "Wiktor",
    age: 20
  }

  const welcomeObjectFemale: WelcomeObject = {
    name: "Ania",
    age: 21
  };

  return (
    <>
      <Welcome name={welcomeObject.name} age={welcomeObject.age} />
      <Welcome name={welcomeObjectFemale.name} age={welcomeObjectFemale.age} />
    </>
  )
}

export default App
