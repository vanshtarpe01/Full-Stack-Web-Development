import RightCardContent from "./RightCardContent"

const RightCard = (props) => {
    
    return (
        <div className="h-full w-80 shrink-0 rounded-4xl relative overflow-hidden">
            <img className="h-full w-full object-cover" src={props.img} alt="" />

          <RightCardContent tag={props.tag} intro={props.intro} color={props.color} id={props.id}/>
        </div>
    )
}

export default RightCard
