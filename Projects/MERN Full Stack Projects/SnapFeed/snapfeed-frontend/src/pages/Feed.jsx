import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:3000/api/auth/me"
      );

      console.log(response.data);

      setPosts(response.data.posts || response.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load posts."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Like post
  const handleLike = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/post/${postId}/like`
      );

      console.log(response.data);

      // Refresh posts
      fetchPosts();
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  // Add comment
  const handleComment = async (postId, comment) => {
    if (!comment.trim()) return;

    try {
      await axios.post(
        `http://localhost:3000/api/post/${postId}`,
        {
          text: comment,
        }
      );

      fetchPosts();
    } catch (error) {
      console.error("Comment error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Mobile Top Navbar */}
      <header className="md:hidden fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-3 bg-white/80 backdrop-blur-md shadow-sm">

        <div className="text-2xl font-extrabold text-blue-700">
          SnapFeed
        </div>

        <div className="flex items-center gap-4 text-slate-600">
          <button className="hover:text-blue-600">
            🔍
          </button>

          <button className="hover:text-blue-600">
            🔔
          </button>
        </div>

      </header>

      {/* Desktop Sidebar */}
      <nav className="fixed left-0 top-0 h-full z-40 p-6 w-64 hidden lg:flex flex-col bg-white shadow-md border-r border-slate-200">

        <div className="mb-8">

          <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
            SnapFeed
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Pulse of the Feed
          </p>

        </div>

        <div className="flex flex-col gap-2 flex-1">

          {/* Home */}
          <a
            href="/"
            className="flex items-center gap-4 bg-blue-600 text-white rounded-xl p-4 font-semibold"
          >
            <span>⌂</span>
            <span>Home</span>
          </a>

          {/* Create */}
          <a
            href="/create"
            className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition"
          >
            <span>＋</span>
            <span>Create</span>
          </a>

          {/* Notifications */}
          <a
            href="#"
            className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition"
          >
            <span>🔔</span>
            <span>Notifications</span>
          </a>

          {/* Profile */}
          <a
            href="/profile"
            className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition"
          >
            <span>👤</span>
            <span>Profile</span>
          </a>

        </div>

      </nav>

      {/* Main */}
      <main className="w-full lg:ml-64 px-4 md:px-12 pt-20 lg:pt-8 pb-24">

        <div className="w-full max-w-2xl mx-auto">

          {/* Stories */}
          <div className="flex gap-4 overflow-x-auto pb-4 mb-6">

            {/* Your Story */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">

              <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-blue-600 to-purple-600">

                <div className="w-full h-full rounded-full bg-white p-[2px]">

                  <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center">
                    👤
                  </div>

                </div>

              </div>

              <span className="text-xs font-medium">
                You
              </span>

            </div>

            {/* Other stories */}
            {["alex.p", "golden_boy"].map((user) => (
              <div
                key={user}
                className="flex flex-col items-center gap-1 flex-shrink-0"
              >

                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-blue-600 to-purple-600">

                  <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-xl">
                    👤
                  </div>

                </div>

                <span className="text-xs font-medium">
                  {user}
                </span>

              </div>
            ))}

          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-10">
              <p className="text-slate-500">
                Loading posts...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6 text-center">
              {error}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && posts.length === 0 && (
            <div className="bg-white rounded-xl p-8 text-center shadow">
              <p className="text-slate-500">
                No posts available.
              </p>
            </div>
          )}

          {/* Feed */}
          <div className="flex flex-col gap-6">

            {posts.map((post) => (
              <PostCard
                key={post._id || post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
              />
            ))}

          </div>

        </div>

      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/90 backdrop-blur-xl shadow-lg rounded-t-xl">

        <a
          href="/me"
          className="flex flex-col items-center text-blue-700 font-semibold"
        >
          <span>⌂</span>
          <span className="text-xs mt-1">Home</span>
        </a>

        <a
          href="/"
          className="flex flex-col items-center text-slate-500"
        >
          <span>＋</span>
          <span className="text-xs mt-1">Create</span>
        </a>

        <a
          href="/profile"
          className="flex flex-col items-center text-slate-500"
        >
          <span>👤</span>
          <span className="text-xs mt-1">Profile</span>
        </a>

      </nav>

    </div>
  );
};

const PostCard = ({
  post,
  onLike,
  onComment,
}) => {

  const [comment, setComment] = useState("");

  const postId = post._id || post.id;

  const username =
    post.user?.username ||
    post.username ||
    "User";

  const profileImage =
    post.user?.profileImage ||
    post.profileImage ||
    null;

  const image =
    post.image ||
    post.imageUrl;

  const caption =
    post.caption || "";

  const likes =
    post.likes?.length ||
    post.likeCount ||
    0;

  const comments =
    post.comments?.length ||
    post.commentCount ||
    0;

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    await onComment(postId, comment);

    setComment("");
  };

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden">

      {/* Post Header */}
      <div className="flex items-center justify-between p-4">

        <div className="flex items-center gap-3">

          {profileImage ? (
            <img
              src={profileImage}
              alt={username}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white">
              👤
            </div>
          )}

          <div>

            <h3 className="font-semibold">
              {username}
            </h3>

            <p className="text-xs text-slate-500">
              {post.createdAt
                ? new Date(post.createdAt).toLocaleString()
                : "Recently"}
            </p>

          </div>

        </div>

        <button className="text-slate-500 hover:text-blue-600 text-xl">
          ⋯
        </button>

      </div>

      {/* Post Image */}
      {image && (
        <div className="w-full aspect-[4/5] bg-slate-200">

          <img
            src={image}
            alt={caption || "Post"}
            className="w-full h-full object-cover"
          />

        </div>
      )}

      {/* Content */}
      <div className="p-4">

        {/* Actions */}
        <div className="flex items-center gap-5 mb-3">

          {/* Like */}
          <button
            onClick={() => onLike(postId)}
            className="text-slate-700 hover:text-red-500 transition text-xl"
          >
            ♡
          </button>

          {/* Comment */}
          <button className="text-slate-700 hover:text-blue-600 transition text-xl">
            💬
          </button>

          {/* Share */}
          <button className="text-slate-700 hover:text-blue-600 transition text-xl">
            ➤
          </button>

          <div className="flex-1" />

          {/* Bookmark */}
          <button className="text-slate-700 hover:text-blue-600 transition text-xl">
            ♧
          </button>

        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mb-1">
          {likes.toLocaleString()} likes
        </p>

        {/* Caption */}
        <p className="text-sm leading-6">

          <span className="font-semibold mr-1">
            {username}
          </span>

          {caption}

        </p>

        {/* Comments */}
        <button className="text-sm text-slate-500 mt-2">
          View all {comments} comments
        </button>

        {/* Add Comment */}
        <form
          onSubmit={handleSubmitComment}
          className="mt-3 flex items-center gap-2"
        >

          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm">
            👤
          </div>

          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
          />

          {comment.trim() && (
            <button
              type="submit"
              className="text-blue-700 font-semibold text-sm"
            >
              Post
            </button>
          )}

        </form>

      </div>

    </article>
  );
};

export default Home;