// React component names must always start with a capital letter, while HTML tags must be lowercase

import './App.css'
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}

// App.jsx
import Card from "./components/Card";

function CardHere() {
  return (
    <div>
      <Card
        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
        title="Nature"
        description="Beautiful nature view with mountains and river."
      />

      <Card
        image="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
        title="Coding"
        description="Learn React step by step with projects."
      />
    </div>
  );
}


export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      {/* Basic Function Calling */}
      <MyButton />
      {/* You Can Also Call The Function */}
      {AboutPage()} 
      <CardHere/>
    </div>
  );
}