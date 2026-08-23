import axios from 'axios';
import Login from './pages/Login';
import Feed from './pages/Feed';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:id" element={<PostDetail />} />
      </Routes>
    </div>
  )
}

export default App
