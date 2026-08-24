import axios from 'axios';
import Login from './pages/Login';
import Feed from './pages/Feed';
import PostDetails from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { Route, Routes } from 'react-router-dom'

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<Feed />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:id" element={<PostDetails />} />
      </Routes>
    </div>
  )
}

export default App
