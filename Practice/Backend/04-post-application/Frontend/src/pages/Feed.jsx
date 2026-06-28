import { useEffect, useState } from "react"
import axios from 'axios'

const Feed = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/posts").then((res) => {
            // console.log(res.data);
            setPosts(res.data.posts);
        })
    }, [])


    return (
        <section className="feed-section">
            {
                posts.length > 0 ? (
                    posts.map((post) => {
                        return (
                            <div key={post._id} className="post-card">
                                <img src={post.image} alt="" />
                                <h3>{post.caption}</h3>
                            </div>
                        );
                    })
                ) : (
                    <h1>No posts available</h1>
                )
            }
        </section>
    )
}

export default Feed
