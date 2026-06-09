import { useEffect, useState } from "react";

// useEffect is used to perform side effects in React.
// Examples: API calls, timers, event listeners, localStorage operations, etc.

const App = () => {

  // State variables
  const [num, setNum] = useState(0);
  const [num2, setNum2] = useState(0);

  // =====================================================
  // 1. useEffect WITHOUT dependency array
  // =====================================================
  // Runs after EVERY render.
  // Initial render + every state update/re-render.
  useEffect(() => {
    console.log("Use Effect 1 is running");
  });

  // =====================================================
  // 2. useEffect WITH EMPTY dependency array
  // =====================================================
  // Runs ONLY ONCE when the component mounts.
  // Similar to componentDidMount() in class components.
  useEffect(() => {
    console.log("Use Effect 2 is running");
  }, []);

  // =====================================================
  // 3. useEffect WITH dependency
  // =====================================================
  // Runs:
  // - On first render
  // - Whenever 'num' changes
  useEffect(() => {
    console.log("Use Effect 3 is running because num changed");
  }, [num]);

  return (
    <div>
      <h1>Num 1: {num}</h1>
      <h1>Num 2: {num2}</h1>

      <button
        onMouseEnter={() => {
          // Update num when mouse enters button
          setNum(num + 1);
        }}
        onMouseLeave={() => {
          // Update num2 when mouse leaves button
          // Note: You are using num here, not num2
          setNum2(num + 10);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default App;


// useEffect(() => {})
// → Runs after every render

// useEffect(() => {}, [])
// → Runs only once (Mounting)

// useEffect(() => {}, [num])
// → Runs when num changes

// useEffect(() => {}, [num, num2])
// → Runs when num OR num2 changes