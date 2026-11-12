import { useEffect, useState } from "react"

const App = () => {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
     .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [])
  return (
    <>
    <h1>Hello All</h1>
     {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  )
}

export default App
