import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreatePosts from './pages/CreatePosts';
import Feed from './pages/Feed';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/create-post' element={<CreatePosts/>}/>
          <Route path='/feed' element={<Feed/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
