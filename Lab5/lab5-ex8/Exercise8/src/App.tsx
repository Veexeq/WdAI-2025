import { BrowserRouter } from 'react-router-dom';
import './App.css'

// import LSCounter from './components/counter/LSCounter';
import AddPage from './components/blog/AddPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <AddPage />
      </BrowserRouter>
    </>
  )
}

export default App;
