import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Marketplace from './pages/Forum';
import Post from './components/Post';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="forum" element={<Marketplace/>}/>
          <Route path="forum/:postId" element={<Post/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
