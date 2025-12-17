import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

// import LSCounter from './components/counter/LSCounter';
// import AddPage from './components/blog/AddPage';
import HomePage from './components/blog/HomePage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
