
const App = () => {
  const handleClick = ()=>{
    alert("Button is Clicked")
  }
  return (
    <div>
      <h1 onMouseEnter={()=> alert("Mouse is Entered")}>Event Handling in React</h1>
      <button onClick={handleClick}>Click Me</button>
      <button onClick={()=>{
        alert("Button 2 is Also Clicked")
      }}>Click Me Also</button>
    </div>
  )
}

export default App
