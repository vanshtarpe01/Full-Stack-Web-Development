const NavBar = (props) => {
  return (
    <div>
        <h1>{props.theme}</h1>
      <button onClick={()=>{
        props.setTheme("Dark")
      }}>Change Theme</button> 
    </div>
  )
}

export default NavBar
