// Card.jsx
function Card(props) {
  return (
    <div style={styles.card}>
      <img src={props.image} alt="card" style={styles.image} />

      <div style={styles.content}>
        <h2>{props.title}</h2>

        <p>{props.description}</p>

        <button style={styles.button}>
          Read More
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: "300px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial",
    margin: "20px auto"
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover"
  },

  content: {
    padding: "15px"
  },

  button: {
    padding: "10px 15px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Card;