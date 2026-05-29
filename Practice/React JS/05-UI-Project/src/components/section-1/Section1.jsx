import NavBar from "./NavBar";
import Page1Content from './Page1Content';
const Section1 = (props) => {
  console.log("From Section1");
  console.log(props.users);
  
  return (
    <div className='h-screen w-full'>
      <NavBar/>
      <Page1Content users={props.users}/>
    </div>
  )
}

export default Section1
