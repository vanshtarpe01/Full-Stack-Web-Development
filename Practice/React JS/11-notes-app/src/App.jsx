import { useState } from "react";
import { X } from 'lucide-react';
const App = () => {

  const [title, setTitle] = useState("");
  const [desciption, setDescription] = useState("");

  const [task, setTask] = useState([])

  const submitHandler = (e) => {
    e.preventDefault();
    const copyTask = [...task];
    copyTask.push({ title, desciption });
    setTask(copyTask);
    // console.log(copyTask);
    setTitle("");
    setDescription("");
  }

  const deleteNote = (idx)=>{
    const copyTask = [...task];
    copyTask.splice(idx, 1);
    setTask(copyTask);
  }

  return (
    <div className='h-screen bg-black text-white lg:flex '>
      <form onSubmit={(e) => {
        submitHandler(e);
      }} className='flex flex-col lg:w-1/2 items-start gap-4 p-10 text-white'>
        <h1 className="text-3xl font-bold">Add Notes</h1>
        {/* First Input for heading */}
        <input className='px-5 py-2 w-full font-medium broder-2 rounded' type="text" placeholder='Enter Notes Heading' value={title} onChange={(e) => {
          setTitle(e.target.value)
        }} />
        {/* Second Input for Description */}
        <textarea className='px-5 h-32 font-medium w-full py-2 broder-2 rounded' placeholder='Write Details' name="" id="" value={desciption} onChange={(e) => {
          setDescription(e.target.value);
        }}></textarea>
        <button className="bg-white active:bg-gray-300 font-medium w-full text-black px-5 py-2 rounded">Add Note</button>
        {/* <img className="rotate-y-180 h-52" src="https://static.vecteezy.com/system/resources/thumbnails/049/578/155/small/a-black-and-white-drawing-of-a-man-writing-png.png" alt="" /> */}
      </form>
      <div className="lg:w-1/2 lg:border-l-2 p-10">
        <h1 className="text-3xl mb-5 font-bold">Recent Notes</h1>
        <div className="flex p-2 overflow-auto flex-wrap gap-5">
          {task.map((elem, idx) => {
            return <div key={idx} className="relative h-52 w-40 bg-cover rounded-2xl text-black px-4 py-8 bg-[url('data:image/jpeg;base64,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')]">
              <h2 onClick={()=>{
                deleteNote(idx);
              }} className="absolute top-3 right-2 bg-red-500 p-2 text-xs rounded-full transition-all duration-200 hover:shadow-[0_0_15px_rgba(239,68,68,0.8)]"><X size={16} strokeWidth={2.75} color="#ffffff" /></h2>
              <h3 className="leading-tight text-xl font-bold">{elem.title}</h3>
              <p className="mt-4 leading-tight font-medium text-gray-500">{elem.desciption}</p>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default App
