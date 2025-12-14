import './App.css'
import Welcome from './components/welcome';

interface WelcomeObject {
  name: string,
  age: number
};

function App() {

  const welcomeObject: WelcomeObject = {
    name: "Wiktor",
    age: 20
  }

  return (
    <>
      <Welcome name={welcomeObject.name} age={welcomeObject.age} />
    </>
  )
}

export default App
