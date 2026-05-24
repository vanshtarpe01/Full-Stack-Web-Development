import React from 'react'
import Card from "./components/Card";
import User from "./components/User"
// import './App.css'
// import './index.css'

const App = () => {
  const arr = ["Ram", "Shyam", "Krishana", "Vhittal", "Pandurang"];

  const arr1 = [
    {
      name: "Vansh",
      age: 19
    },
    {
      name: "Shreyash",
      age: 20
    }
    ,
    {
      name: "Somesh",
      age: 19
    },
    {
      name: "Somesh",
      age: 19
    },
    {
      name: "Suraj",
      age: 20
    }
  ];

  // arr1.map(function (elem) {
  //   console.log(elem.name);

  // })


  const jobOpenings = [
    {
      brandLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      companyName: "Google",
      datePosted: "2 Days Ago",
      post: "Frontend Developer",
      tag1: "FullTime",
      tag2: "Junior Level",
      pay: "$45/hr",
      location: "Mumbai, India"
    },
    {
      brandLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      companyName: "Microsoft",
      datePosted: "1 Week Ago",
      post: "React Developer",
      tag1: "FullTime",
      tag2: "Senior Level",
      pay: "$60/hr",
      location: "Mumbai, India"
    },
    {
      brandLogo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      companyName: "Amazon",
      datePosted: "5 Days Ago",
      post: "Software Engineer",
      tag1: "FullTime",
      tag2: "Junior Level",
      pay: "$50/hr",
      location: "Mumbai, India"
    },
    {
      brandLogo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
      companyName: "Meta",
      datePosted: "3 Weeks Ago",
      post: "Backend Developer",
      tag1: "PartTime",
      tag2: "Senior Level",
      pay: "$70/hr",
      location: "Mumbai, India"
    },
    {
      brandLogo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      companyName: "Apple",
      datePosted: "4 Days Ago",
      post: "iOS Developer",
      tag1: "FullTime",
      tag2: "Mid Level",
      pay: "$65/hr",
      location: "Mumbai, India"
    },
    {
      brandLogo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      companyName: "Netflix",
      datePosted: "2 Weeks Ago",
      post: "UI/UX Engineer",
      tag1: "Remote",
      tag2: "Senior Level",
      pay: "$75/hr",
      location: "Mumbai, India"
    },
    {
      brandLogo: "data:image/png;base64,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",
      companyName: "Adobe",
      datePosted: "6 Days Ago",
      post: "Java Developer",
      tag1: "FullTime",
      tag2: "Junior Level",
      pay: "$48/hr",
      location: "Mumbai, India"
    },
    {
      brandLogo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
      companyName: "Uber",
      datePosted: "10 Days Ago",
      post: "Android Developer",
      tag1: "Contract",
      tag2: "Mid Level",
      pay: "$55/hr",
      location: "Mumbai, India"
    },
    {
      brandLogo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
      companyName: "Airbnb",
      datePosted: "1 Month Ago",
      post: "Full Stack Developer",
      tag1: "Remote",
      tag2: "Senior Level",
      pay: "$80/hr",
      location: "Mumbai, India"
    },
    {
      brandLogo: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg",
      companyName: "LinkedIn",
      datePosted: "8 Days Ago",
      post: "Node.js Developer",
      tag1: "FullTime",
      tag2: "Mid Level",
      pay: "$58/hr",
      location: "Mumbai, India"
    }
  ];

  return (
    <div className='parent'>

      {/* <Card/> */}

      {/* Data Passing Using Props - Without Loop and Array*/}
      {/* <User name="Vansh"/>
      <User name="Somesh"/>
      <User name="Shreyash"/>
      <User name="Aman"/> */}

      {/* Data Passing Using Props - Without Loop*/}
      {/* <User name ={arr[0]}/>
      <User name ={arr[1]}/>
      <User name ={arr[2]}/>
      <User name ={arr[3]}/>
      <User name ={arr[4]}/> */}

      {/* Using Array and Map Function */}
      {/* {arr.map(function(element){
        return element;
      })} */}

      {/* Using Array and Foreach */}
      {/* {arr.forEach((elem)=>{
        console.log(elem);
      })} */}


      {/* Now Using the JobOpeinings Array of objects we are calling cards and passing data that is Jovopenings */}
      {jobOpenings.map(function (element, idx) {
        return <div key={idx}>
          <Card logo={element.brandLogo} company={element.companyName} date={element.datePosted} post={element.post} tag1={element.tag1} tag2={element.tag2} perhour={element.pay} loc={element.location} />
        </div>
      })}


    </div>
  )
}

export default App
