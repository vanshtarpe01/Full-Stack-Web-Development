import { useState } from "react"
import Navbar from "./components/Navbar"

const App = () => {
  const [theme, setTheme] = useState("light");
  return (
    <div>
      <Navbar theme={theme}>
        </Navbar>
    </div>
  )
}

export default App
