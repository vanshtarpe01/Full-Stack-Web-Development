const App = () => {
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem("name", "Vansh");
  localStorage.setItem("rollno", "MLU25S211");
  localStorage.setItem("mobileno", "7350391952");
  localStorage.setItem("address", "Nandgaon Peth");


  // JSON.stringify() : Use to convert JS Object data into JSON format
  // JSON.parse() : Use to convert JSON data into JS Object format

  const data = [
    { id: 1, name: "Alice", active: true },
    { id: 2, name: "Bob", active: false },
    { id: 3, name: "Charlie", active: true }
  ];

  // localStorage.setItem(
  //   "data",
  //   '[{"id":1,"name":"Alice","active":true},{"id":2,"name":"Bob","active":false},{"id":3,"name":"Charlie","active":true}]'
  // );

  localStorage.setItem("data", JSON.stringify(data));

  const storedData = JSON.parse(localStorage.getItem("data"));

  console.log(storedData);


  // localStorage.removeItem("") : Use to remove item

  return (
    <div>
      <h1>{localStorage.getItem("name")}</h1>
      <h1>{localStorage.getItem("rollno")}</h1>
      {/* <h1>{storedData[0].name}: {storedData[0].active.toString()}</h1>
      <h1>{storedData[1].name}: {storedData[1].active.toString()}</h1>
      <h1>{storedData[2].name}: {storedData[2].active.toString()}</h1> */}
      {
        storedData.map((user) => (
          <h1 key={user.id}>
            {user.name} : {user.active.toString()}
          </h1>
        ))
      }
    </div>
  )
}

export default App
