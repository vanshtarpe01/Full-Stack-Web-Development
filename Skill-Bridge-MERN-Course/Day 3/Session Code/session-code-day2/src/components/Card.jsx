const Card = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, esse?</p>
      <img src={props.image} alt="" />
        <button onClick={()=>{alert("Added to the Cart")}}>Add to Card</button>
    </div>
  )
}

export default Card
