import axios from "axios";
import { useState } from "react";

const App = () => {
  async function getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    // console.log(response.json()); It also rertun an promise
    const data = await response.json();

    console.log(data);
    console.log(data.title);

  }
  // Arrow Async await function
  const getData1 = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    const data = await response.json();
    console.log(data);
    console.log(data[0].email);
  }

  const getUsers = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(response);
    console.log(response.data);
    console.log(response.data[0].name);
  }

  const [images, setImages] = useState([]);
  const getImages = async () => {
    const response = await axios.get("https://picsum.photos/v2/list");
    console.log(response);
    console.log(response.data);
    console.log(response.data[0].author);
    setImages(response.data);
  }

  return (
    <div>
      <h1>{localStorage.getItem("name")}</h1>
      {/* <h1>{data.title}</h1> */}
      <button onClick={getData}>Get Data</button>
      <button onClick={getData1}>Get Data1</button>
      <button onClick={getUsers}>Get Users</button>
      <button onClick={getImages}>Get Images</button>
      {images.map((elem, idx)=>{
      return <h3>{idx} Hello {elem.author} </h3>
})}
    </div>
  )
}

export default App
