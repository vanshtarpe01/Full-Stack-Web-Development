import Section1 from "./components/section-1/Section1";
import Section2 from "./components/section-2/Section2";
const App = () => {

  const users = [
    {
      img: "https://plus.unsplash.com/premium_photo-1661607046789-027c27101d04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
      intro: "Building smart financial habits while exploring better investment opportunities daily.",
      color: "blue",
      tag: "Satisfied"
    },

    {
      img: "https://plus.unsplash.com/premium_photo-1661720579227-03d3a1da61d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ0fHx8ZW58MHx8fHx8",
      intro: "Seeking premium banking services despite maintaining stable professional income growth.",
      color: "black",
      tag: "Underserved"
    },

    {
      img: "https://plus.unsplash.com/premium_photo-1732098508803-d6423c0ce883?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      intro: "Managing freelance earnings using flexible digital banking and payment solutions.",
      color: "darkcyan",
      tag: "Underbanked"
    },

    {
      img: "https://plus.unsplash.com/premium_photo-1663045743336-dd6349bb5ed8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8",
      intro: "Growing startup operations while learning smarter budgeting and financial planning strategies.",
      color:"darkviolet",
      tag: "Investor"
    },

    {
      img: "https://plus.unsplash.com/premium_photo-1661641353075-f0eaf2d82aae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHdvcmtpbmclMjBwcm9mZXNzaW9uYWxzfGVufDB8fDB8fHww",
      intro: "Exploring wealth management strategies for achieving future financial independence confidently.",
      color:"darkolivegreen",
      tag: "Wealth Builder"
    }
  ];
  return (
    <div>
      <Section1 users={users} />
      <Section2 />
    </div>
  )
}

export default App
