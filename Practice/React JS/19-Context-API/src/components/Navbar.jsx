import Navbar2 from "./Navbar2"

// const Navbar = (props) => {
//     console.log(props.children);
    
//   return (
//     <div className="nav">
//       <h2>Admin Vansh</h2>
//       {props.children[0]}
//       {props.children[1]}
//       <Navbar2 theme={props.theme}/>
//     </div>
//   )
// }

// We can also do it like this
const Navbar = ({children, theme}) => {
    console.log(children);
    
  return (
    <div className="nav">
      <h2>Admin Vansh</h2>
      {children[0]}
      {children[1]}
      <Navbar2 theme={theme}/>
    </div>
  )
}
// Using the Destructing..

export default Navbar
