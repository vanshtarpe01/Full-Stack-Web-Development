const App = () => {

  const submitHandler = (e)=>{
    e.preventDefault();
    console.log("Form Submitted");
  }

  return (
    <div>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <input type="text" placeholder="Enter your Firstname" />
        <br />
        <input type="text" placeholder="Enter your Lastname" />
        <br/>
        <button>Click here to Submit</button>
      </form>
    </div>
  )
}

export default App
