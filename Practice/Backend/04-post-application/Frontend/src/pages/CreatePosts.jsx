import axios from "axios"
import { useNavigate } from 'react-router-dom'

const CreatePosts = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    axios.post("http://localhost:3000/create-post", formData).then((res) => {
      console.log(res);
      alert("Post created successfully");
      e.target.reset();
      navigate("/feed")

    }).catch((err) => {
      console.log(err);
      alert("Error creating post");
    });

  }

  return (
    <section className="create-post-section">
      <h1>Create Post</h1>
      <form onSubmit={(e) => {
        handleSubmit(e);
      }}>
        <input type="file" name="image" accept="image/*" />
        <textarea type="text" name="caption" required placeholder="Enter caption" />
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default CreatePosts
