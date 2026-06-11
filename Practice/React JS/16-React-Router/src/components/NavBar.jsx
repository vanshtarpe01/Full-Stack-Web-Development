import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className='nav'>
        <h2>Admin Vansh</h2>
        <div>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
  )
}

export default NavBar
