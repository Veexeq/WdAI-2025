import { BrowserRouter } from 'react-router-dom';
import './App.css'

import LSCounter from './components/LSCounter';

function App() {

  return (
    <>
      <BrowserRouter>
        <LSCounter />
      </BrowserRouter>
    </>
  )
}

export default App;
