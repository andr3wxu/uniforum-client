import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Forum from './pages/Forum';
import Post from './components/Post';
import Create from './pages/Create';
import Profile from './pages/Profile';
import Forbidden from './pages/Forbidden';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route index element={<Home/>} />
          <Route path="login" element={<Login/>} />
          <Route path="sign-up" element={<Register />} />
          <Route path="forum" element={<Forum/>} />
          <Route path="forum/:postId" element={<Post/>} />
          <Route path="create" element={<Create />} />
          <Route path="profile" element={<Profile />} />
          <Route path="forbidden" element={<Forbidden />} />
          <Route path="*" element={<NotFound/> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

// readme
// clean up code
