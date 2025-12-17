import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

// import LSCounter from './components/counter/LSCounter';
// import AddPage from './components/blog/AddPage';
import HomePage from './components/blog/HomePage';
import Blog from './components/blog/Blog';
import Post from './components/blog/Post';
import AddPage from './components/blog/AddPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/article/:id' element={<Post />} />
          <Route path='/dodaj' element={<AddPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
