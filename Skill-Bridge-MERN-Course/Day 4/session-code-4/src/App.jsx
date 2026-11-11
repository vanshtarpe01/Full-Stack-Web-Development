const App = () => {
  const isLoggedIn = true;
  const isAvailable = false;
  return (
    <div>
      {/* Conditional Rendering */}
      {/* Ternary Operator it is like is else */}
      {isLoggedIn ? (
          <h1>Welcome to Home Page</h1>
        )
        : (
          <h1>Please Login</h1>
        )
      }

      {/* Logical And(&&) it shows/render only if the condition is true */}
       <h1>Wireless Headphones</h1>
      {
        isAvailable && (
          <button>Buy Now</button>
        )
      }
    </div>
  )
}

export default App
