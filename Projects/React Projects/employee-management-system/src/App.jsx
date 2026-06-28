import Login from './components/auth/Login'
import EmployeeDashboard from './dashboard/EmployeeDashboard'
import AdminDashboard from './dashboard/AdminDashboard'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './context/AuthProvider'

const App = () => {
  
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const authData = useContext(AuthContext);
  
  useEffect(() => {
    if(authData){
      const loggedInUser = localStorage.getItem("loggedInUser");
      if(loggedInUser){
        setUser(loggedInUser.role);
      }
    }
  },[authData]);
  
  const handleLogin = (email, password) =>{
    if(email == 'admin@me.com' && password == "123"){
      setUser({role:"admin"});
      localStorage.setItem("loggedInUser", JSON.stringify({role:"admin"}));
    }else if(authData){
      const employee = authData.employees.find((e)=> email == e.email && password == e.password);
      if(employee){
        setUser({role:employee});
        setUserData(employee);
        localStorage.setItem("loggedInUser", JSON.stringify({role:"employee"}));
      }
    }else{
      alert("Invalid Credentials")
    }
  }

  return (
   <>
      {!user ? <Login handleLogin = {handleLogin} /> : ''}
      {user == 'admin' ? <AdminDashboard/> : {user == {employee} ? <EmployeeDashboard data={userData}/> : null}}
   </>
  )
}

export default App
