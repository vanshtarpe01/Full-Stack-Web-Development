// React Hooks: 

import { useState } from "react"

/*
  useState :- Used to manage State
  useEffect :- side effects handling(For Examples: API Calling, DOM Manipulation and Event Listening)
  useContext :- Global State Consuming so don't need of props drilling
  useReducer :- For Complex State Management (Redux like Small version)
  useRef :- Mutable Value holds, without re-redering the ui or for accessing DOM.
  useMemo & useCallback:- For Optimization and for avoiding the uneccessary re-renders.
*/
const App = () => {
  // let a = 20;
  // function chnageA() {
  //   console.log("Button is Clicked");
  //   console.log(a);
  //   // a = 30;
  //   a++
  //   console.log(a);
  // }

  const [num, setNum] = useState(10);
  const [username, setUsername] = useState("Sarthak");
  const [users, setUsers] = useState(["Vansh", "Ramesh", "Suresh", "Ganesh"]);
  const [count, setCount] = useState(0);

  function changeNum() {
    setNum(30);
    setUsername("Vansh");
    setUsers(["Vansh", "Ramesh", "Suresh", "Ganesh", "Umesh", "Somesh", "Pranav", "Sahil"])
  }

  function countIncrease() {
    setCount(count + 1);
  }

  function countDecrease() {
    setCount(count - 1);
  }
  function jumpBy5() {
    setCount(num + 5);
  }

  return (
    <div>
      {/* <h1>Value of a is :- {a}</h1>
      <button onClick={chnageA}>Click Me</button> */}

      <h1>Value of Num is :- {num} <br /> {users} <br /> Value of user is :- {username}</h1>
      <button onClick={changeNum}>Click Here</button>

      {/* Counter Basic Project */}
      <div className="counterContainer">
        <button className="countDecrease" onClick={countIncrease}>Increase</button>
        <h1 style={{ color: "black" }}>Count : {count}</h1>
        <button className="countIncrease" onClick={countDecrease}>Decrease</button>
        <button className="jumpBy5" onClick={jumpBy5}>Increase By 5</button>
      </div>

    </div>
  )
}

export default App
