import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [likesModalPost, setLikesModalPost] = useState(null);
  const [commentsModalPost, setCommentsModalPost] = useState(null);
  const [commentsList, setCommentsList] = useState([]);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/me", { withCredentials: true });
      setCurrentUserId(response.data.user?._id || response.data.user?.userId || null);
    } catch (error) {
      console.error("Current user fetch error:", error);
    }
  };

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:3000/api/post/feed",
        { withCredentials: true }
      );

      console.log(response.data);

      setPosts(Array.isArray(response.data.posts) ? response.data.posts : []);
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
    fetchCurrentUser();
    fetchPosts();
  }, []);

  const openLikesModal = (post) => {
    setLikesModalPost(post);
  };

  const openCommentsModal = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/comment/${postId}`,
        { withCredentials: true }
      );

      setCommentsList(response.data.comments || []);
      setCommentsModalPost(postId);
    } catch (error) {
      console.error("Comments fetch error:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/api/post/${postId}`, { withCredentials: true });
      fetchPosts();
    } catch (error) {
      console.error("Delete post error:", error);
    }
  };

  // Like / unlike post
  const handleLike = async (post) => {
    if (!post || !currentUserId) return;

    const isLiked = (post.likes || []).some(
      (user) => String(user?._id || user?.id) === String(currentUserId)
    );

    const endpoint = isLiked ? "unlike" : "like";

    try {
      const response = await axios.put(
        `http://localhost:3000/api/post/${post._id || post.id}/${endpoint}`,
        {},
        { withCredentials: true }
      );

      console.log(response.data);
      fetchPosts();
    } catch (error) {
      console.error(`${endpoint === "like" ? "Like" : "Unlike"} error:`, error);
    }
  };

  // Add comment
  const handleComment = async (postId, comment) => {
    if (!comment.trim()) return;

    try {
      await axios.post(
        `http://localhost:3000/api/comment/${postId}`,
        {
          text: comment,
        },
        { withCredentials: true }
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
          <Link
            to="/me"
            className="flex items-center gap-4 bg-blue-600 text-white rounded-xl p-4 font-semibold"
          >
            <span>⌂</span>
            <span>Home</span>
          </Link>

          {/* Create */}
          <Link
            to="/create"
            className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition"
          >
            <span>＋</span>
            <span>Create</span>
          </Link>

          {/* Notifications */}
          <a
            href="#"
            className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition"
          >
            <span>🔔</span>
            <span>Notifications</span>
          </a>

          {/* Profile */}
          <Link
            to="/profile"
            className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition"
          >
            <span>👤</span>
            <span>Profile</span>
          </Link>

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
                currentUserId={currentUserId}
                onLike={handleLike}
                onComment={handleComment}
                onDeletePost={handleDeletePost}
                onOpenLikes={openLikesModal}
                onOpenComments={openCommentsModal}
              />
            ))}

          </div>

          {likesModalPost && (
            <div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setLikesModalPost(null)}
            >
              <div
                className="bg-white rounded-xl w-full max-w-md max-h-[70vh] overflow-y-auto p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Likes</h3>
                  <button className="text-gray-500" onClick={() => setLikesModalPost(null)}>✕</button>
                </div>
                <div className="space-y-3">
                  {(likesModalPost.likes?.length ? likesModalPost.likes : []).map((user) => (
                    <div key={user._id || user.id} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                        {user.profileImage ? (
                          <img src={user.profileImage} alt={user.username} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-sm font-medium">{(user.username || "U").charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <span className="font-medium">{user.username || "Unknown User"}</span>
                    </div>
                  ))}

                  {(!likesModalPost.likes || likesModalPost.likes.length === 0) && (
                    <p className="text-sm text-slate-500">No likes yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {commentsModalPost && (
            <div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => { setCommentsModalPost(null); setCommentsList([]); }}
            >
              <div
                className="bg-white rounded-xl w-full max-w-lg max-h-[75vh] overflow-y-auto p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Comments</h3>
                  <button className="text-gray-500" onClick={() => { setCommentsModalPost(null); setCommentsList([]); }}>✕</button>
                </div>
                <div className="space-y-4">
                  {commentsList.length === 0 ? (
                    <p className="text-sm text-slate-500">No comments yet.</p>
                  ) : (
                    commentsList.map((item) => (
                      <div key={item._id || item.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                          {item.user?.profileImage ? (
                            <img src={item.user.profileImage} alt={item.user.username} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs font-medium">{(item.user?.username || "U").charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{item.user?.username || "User"}</p>
                          <p className="text-sm text-slate-600">{item.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/90 backdrop-blur-xl shadow-lg rounded-t-xl">

        <Link
          to="/me"
          className="flex flex-col items-center text-blue-700 font-semibold"
        >
          <span>⌂</span>
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          to="/create"
          className="flex flex-col items-center text-slate-500"
        >
          <span>＋</span>
          <span className="text-xs mt-1">Create</span>
        </Link>

        <Link
          to="/profile"
          className="flex flex-col items-center text-slate-500"
        >
          <span>👤</span>
          <span className="text-xs mt-1">Profile</span>
        </Link>

      </nav>

    </div>
  );
};

const PostCard = ({
  post,
  currentUserId,
  onLike,
  onComment,
  onDeletePost,
  onOpenLikes,
  onOpenComments,
}) => {

  const [comment, setComment] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const isOwner = String(post.user?._id || post.user || "") === String(currentUserId || "");
  const isLiked = (post.likes || []).some(
    (user) => String(user?._id || user?.id) === String(currentUserId || "")
  );

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    await onComment(postId, comment);

    setComment("");
  };

  const openPostDetail = () => {
    navigate(`/${postId}`);
  };

  const handleDoubleClickLike = () => {
    onLike(post);
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

        <div className="relative">
          <button
            className="text-slate-500 hover:text-blue-600 text-xl"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ⋯
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-8 bg-white border border-slate-200 rounded-lg shadow-md z-10 min-w-[160px]">
              {isOwner ? (
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50"
                  onClick={() => {
                    setMenuOpen(false);
                    onDeletePost(postId);
                  }}
                >
                  Delete Post
                </button>
              ) : (
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate(`/${postId}`);
                  }}
                >
                  Open Post
                </button>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Post Image */}
      {image && (
        <div
          className="w-full aspect-[4/5] bg-slate-200 cursor-pointer"
          onClick={openPostDetail}
          onDoubleClick={handleDoubleClickLike}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openPostDetail();
            }
          }}
        >

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
            onClick={() => onLike(post)}
            className={`transition text-xl ${isLiked ? "text-red-500" : "text-slate-700 hover:text-red-500"}`}
            aria-label={isLiked ? "Unlike post" : "Like post"}
          >
            {isLiked ? "♥" : "♡"}
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
        <button
          className="font-semibold text-sm mb-1 text-left"
          onClick={() => onOpenLikes(post)}
        >
          {likes.toLocaleString()} likes
        </button>

        {/* Caption */}
        <p
          className="text-sm leading-6 cursor-pointer"
          onClick={openPostDetail}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openPostDetail();
            }
          }}
        >

          <span className="font-semibold mr-1">
            {username}
          </span>

          {caption}

        </p>

        {/* Comments */}
        <button
          className="text-sm text-slate-500 mt-2 text-left"
          onClick={() => onOpenComments(postId)}
        >
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