import { useState } from "react";

const App = () => {

  const [name, setName] = useState("")

  const submitHandler = (e)=>{
    e.preventDefault();
    console.log("Form Submitted by", name);
    setName("");
  }

  // TwoWayBinding
  // 1. Value of Input is "" empty
  // 2. Value of text is changing by getting input
  // 3. Setname is setting the value to the input
  // 4. Then the Setname is again empty

  return (
    <div>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <input type="text" placeholder="Enter your Name" 
        value={name}
        onChange={(e)=>{
          console.log(e);  //It is used to get the Evnet details
          console.log(e.target); //It is used to get which event is performed
          console.log(e.target.value); //Getting the Actual Value form the event
          setName(e.target.value);
        }}
        />
        <br />
        <button>Click here to Submit</button>
      </form>
    </div>
  )
}

export default App
