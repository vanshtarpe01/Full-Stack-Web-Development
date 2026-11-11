import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Nav from './component/nav.jsx'
import Footer from './component/footer.jsx'
import Card from './component/Card.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav/>
    <App />
    <Card/>
    <Card/>
    <Card/>
    <Footer/>
  </StrictMode>,
)
