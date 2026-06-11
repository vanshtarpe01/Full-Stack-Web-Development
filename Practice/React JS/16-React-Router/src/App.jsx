import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Contact from './pages/Contact'
import About from './pages/About'
import NavBar from './components/NavBar'
const App = () => {
  return (
    <div>
      <NavBar/>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
      </Routes>

    </div>
  )
}

export default App


// Browser Routes
// google.com = /
// google.com/gemini = /gemini
// google.com/ai-studio = /ai-studio