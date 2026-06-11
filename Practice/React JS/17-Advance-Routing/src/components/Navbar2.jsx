import { useNavigate } from "react-router-dom";

const Navbar2 = () => {
  let navigate = useNavigate();
    return (
        <div className="flex py-2 px-5 bg-cyan-700 justify-center">
            <button onClick={() => {
                navigate('/')
            }} className="bg-amber-400 font-medium px-5 py-2 rounded m-2 cursor-pointer active:scale-95">Return To Home Page</button>
            <button onClick={() => {
                navigate('/courses')
            }} className="bg-amber-400 font-medium px-5 py-2 rounded m-2 cursor-pointer active:scale-95">Go To Courses Page</button>
            <button onClick={() => {
                navigate(-1)
            }} className="bg-amber-400 font-medium px-5 py-2 rounded m-2 cursor-pointer active:scale-95">Back</button>
            <button onClick={() => {
                navigate(+1)
            }} className="bg-amber-400 font-medium px-5 py-2 rounded m-2 cursor-pointer active:scale-95">Next</button>
        </div>
    )
}

export default Navbar2
