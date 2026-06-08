import { useState } from "react"

const App = () => {
  const [num, setNum] = useState(10);
  const [user, setUser] = useState({ name: "Vansh", age: 20 });
  const [arr, setArr] = useState([10, 20, 30, 40, 50]);
  const [abc, setAbc] = useState(10);

  const onChnage = () => {
    console.log(num);
    setNum(num + 5); // It is a Asnychronous function
    console.log(num);
  }

  // This method is used to change the properties of object
  const userChange = () => {
    const newUser = { ...user };
    newUser.name = "Admin";
    newUser.age = 21;
    setUser(newUser)
  }

  // Second Method
  const userAgeChange = () =>{
    setUser(prev=>({...prev, age:50}));
  }

  // Changing Properties of an array
  const arrChange = ()=>{
    const newArr = [...arr];
    newArr[0] = 100;
    newArr[2] = 300;
    newArr.push(60);
    setArr(newArr);
  }

  // Batch Updates
  const chnageAbc = ()=>{
    // If we print this then the value is only num+1
    // setAbc(num+1);
    // setAbc(num+1);
    // setAbc(num+1);

    // But if now we print this then num will increment accordingly
    setAbc(prev=>(prev+1));
    setAbc(prev=>(prev+1));
    setAbc(prev=>(prev+1));
  }
  return (

    <div>
      <h1>Num is {num} and Array: {arr}</h1>
      <button onClick={arrChange} onDoubleClick={onChnage}>Click here..</button>
      <h3 onClick={chnageAbc}>My name is {user.name} and my age is {user.age} Abc: {abc}</h3>
      <button onDoubleClick={userAgeChange} onClick={userChange}>CLick here to change user</button>
    </div>
  )
}

export default App
