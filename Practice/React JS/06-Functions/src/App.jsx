
const App = () => {

  function btnClicked() {
    console.log("Button is Clicked");
  }

  function mouseEnter(){
    console.log("Mouse Enter");
  }

  function inputChanging(){
    console.log("Input is Changing");
  }
  function inputChanging1(elem){
    console.log(elem.target.value);
  }
  function inputChanging2(val){
    console.log(val);
  }
  const pageScrolling = (elem) =>{
    if(elem>0){
      console.log("Forward Scrolling");
    }else{
      console.log("Backward Scrolling");
    }
  }
  return (
    <div>

      {/* Indirect Function Passing */}
      {/* It runs before event is happen */}
      {/* <button onClick={btnClicked()}>Click Here</button> */}
      {/* It runs only when the event is occured */}
      <button onMouseEnter={mouseEnter} onClick={btnClicked}>Click Here</button>

      {/* Direct Normal Function Passing */}
      <button onClick={function(){
        console.log("Explore this button is Clicked");
      }}>Explore This</button>

       {/* Direct Arrow Function Passing */}
      <button onClick={()=>{
        console.log("Read More button is Clicked");
      }}>Read More</button>

      {/* Input Change Function Indirect-Passing */}
      <input onChange={inputChanging} type="text" placeholder="Enter Your Name" />

      {/* Input Change Function Direct Passing and Getting Value */}
      <input onChange={function(elem){
        console.log(elem.target.value);
      }} type="text" placeholder="Enter Your Address" />

      {/* Input Change Function Indirect Passing and Getting Value */}
      <input onChange={function(elem){
        inputChanging1(elem);
      }} type="text" placeholder="Enter Your City" />

      
      {/* Input Change Function Indirect Passing and Getting Value Method 2*/}
      <input onChange={function(elem){
        inputChanging2(elem.target.value);
      }} type="text" placeholder="Enter Your Town" />

      <div onMouseMove={function(elem){
        console.log(`Mouse is Moving in X: ${elem.clientX} And in Y:${elem.clientY}`)
      }} className="box"></div>

      <div onWheel={function(elem){
        pageScrolling(elem.deltaY)
      }}>
        <div className="page1"></div>
        <div className="page2"></div>
        <div className="page3"></div>
      </div>

    </div>
  )
}

export default App
