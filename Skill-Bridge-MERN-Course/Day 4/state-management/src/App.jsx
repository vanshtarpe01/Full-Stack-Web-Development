import { useState } from "react"
const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Counter Application</h1>
      <h2>Count : {count}</h2>
      <button onClick={() => setCount((count + 1))}>
        Increment
      </button>
      <button onClick={() => setCount((count - 1))}>
        Decrement
      </button>
    </div>
  )
}

export default App
