import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Nav from './component/nav.jsx'
import Footer from './component/footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav/>
    <App />
    <Footer/>
  </StrictMode>,
)
