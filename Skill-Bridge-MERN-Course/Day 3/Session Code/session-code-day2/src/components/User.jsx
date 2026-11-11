const User = (props) => {
    let userData = {
        username : "Admin",
        role : "user"
    }
  return (
    <div>
      <h1>Username: {userData.username}</h1>
      <h2>Role : {props.role}</h2>
    </div>
  )
}

export default User
