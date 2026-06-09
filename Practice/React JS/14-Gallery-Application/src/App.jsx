import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {

  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(1);

  const getData = async () => {
    console.log("Data is Comming");
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=30`);
    console.log(response.data);
    setUserData(response.data);
  }


  useEffect(function () {
    getData();
  }, [index]);

  let printUserData = <h3 className='bg-gray-300 text-lg -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>Loading.....</h3>;
  if (userData.length > 0) {
    printUserData = userData.map(function (elem, idx) {
      return <div key={idx} >
        <a href={userData.url} target='_blank'>
          <div className='h-40 w-48 rounded-2xl overflow-hidden'>
            <img className='h-full[82%] w-full object-cover' src={elem.download_url} alt="" />
          </div>
          <h2 className='font-bold text-lg'>
            {elem.author}
          </h2>
        </a>
      </div>

    })
  }
  return (
    <div className="bg-black h-screen overflow-auto text-white">
      {/* <button
        onClick={getData}
        className="bg-green-600 m-5 active:scale-95 text-white px-5 py-2 rounded">Get Data</button> */}
      <h1 className='fixed bg-red-500 text-3xl rounded-full px-4 py-2 m-2'>{index}</h1>
      <div className='flex flex-wrap justify-center gap-4 p-4'>
        {printUserData}
      </div>
      <div className='flex justify-center items-center p-4 gap-4'>
        <button onClick={() => {
          if (index > 1) {
            
            setIndex(index - 1);
            setIndex([]);
          }
        }}
          className='bg-amber-300 text-black rounded px-4 py-2 font-medium cursor-pointer active:scale-95'>Prev</button>
          <h3>Page {index} </h3>
        <button onClick={() => {
          setIndex(index + 1);
          setIndex([]);
        }} className='bg-amber-300 text-black rounded px-4 py-2 font-medium cursor-pointer active:scale-95'>Next</button>
      </div>
    </div>
  )
}

export default App
