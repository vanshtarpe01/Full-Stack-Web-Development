import { useContext } from "react"
import Navbar2 from "./Navbar2"
import { ThemeDataContext } from "../context/ThemeContext"

const Navbar = (props) => {
    const data = useContext(ThemeDataContext);
    console.log(data);
  return (
    <div className="nav">
      <h2>Admin {data}</h2>
      <Navbar2 theme={props.theme}/>
    </div>
  )
}
export default Navbar
