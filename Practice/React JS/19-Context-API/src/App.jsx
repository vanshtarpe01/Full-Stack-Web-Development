import { useState } from "react"
import Navbar from "./components/Navbar"

const App = () => {
  const [theme, setTheme] = useState("light");
  return (
    <div>
      <Navbar theme={theme}>
        <h2>This is New NavBar</h2>
        <h2>Another New NavBar</h2>
        </Navbar>
    </div>
  )
}

export default App
