import { useState } from "react"
import NavBar from "./components/NavBar";

const App = () => {
  const [theme, setTheme] = useState("light");
  return (
    <div>
      <h1>Theme is {theme}</h1>
      <NavBar theme = {theme} setTheme ={setTheme}/>
    </div>
  )
}

export default App
