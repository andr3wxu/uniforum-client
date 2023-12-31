import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Marketplace from './pages/Marketplace';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="marketplace" element={<Marketplace/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
