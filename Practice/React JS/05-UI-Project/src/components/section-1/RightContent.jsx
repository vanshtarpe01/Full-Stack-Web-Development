import RightCard from "./RightCard"

const RightContent = (props) => {
  console.log("From Right Content");
  console.log(props.users);
  
  
  return (
    <div id="right" className='h-full w-2/3 p-4 rounded-4xl flex flex-nowrap gap-10 overflow-x-auto'>
      {props.users.map(function(cards, idx){
        return <RightCard img={cards.img} intro={cards.intro} color={cards.color} tag={cards.tag} key={idx} id={idx}/>
      })}
    </div>
  )
}

export default RightContent
