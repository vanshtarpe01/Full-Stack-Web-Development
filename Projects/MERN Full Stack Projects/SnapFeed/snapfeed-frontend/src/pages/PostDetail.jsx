import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

const PostDetails = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/me", { withCredentials: true });
      setCurrentUserId(response.data.user?._id || response.data.user?.userId || null);
    } catch (error) {
      console.error("Current user fetch error:", error);
    }
  };

  // Get single post
  const fetchPost = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `http://localhost:3000/api/post/${id}`,
        { withCredentials: true }
      );

      console.log(response.data);

      setPost(response.data.post || response.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load post."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchPost();
  }, [id]);

  // Add comment
  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      setCommentLoading(true);

      await axios.post(
        `http://localhost:3000/api/comment/${id}`,
        {
          text: comment,
        },
        { withCredentials: true }
      );

      setComment("");

      // Reload post so new comment appears
      await fetchPost();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add comment."
      );
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/post/${id}`, { withCredentials: true });
      window.location.href = "/me";
    } catch (error) {
      console.error("Delete post error:", error);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/comment/${commentId}`,
        { withCredentials: true }
      );

      fetchPost();
    } catch (error) {
      console.error("Delete comment error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">
          Loading post...
        </p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error || "Post not found."}
          </p>

          <Link
            to="/me"
            className="text-blue-700 font-semibold hover:underline"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const username =
    post.user?.username ||
    post.username ||
    "User";

  const profileImage =
    post.user?.profileImage ||
    post.profileImage;

  const image =
    post.image ||
    post.imageUrl;

  const caption =
    post.caption || "";

  const comments =
    post.comments || [];

  const isOwner = String(post.user?._id || post.user || "") === String(currentUserId || "");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ================= DESKTOP SIDEBAR ================= */}

      <nav className="fixed left-0 top-0 h-full z-40 p-6 w-64 hidden lg:flex flex-col border-r border-slate-200 bg-white shadow-md">

        <div className="mb-8">

          <h1 className="text-4xl font-extrabold text-blue-700">
            SnapFeed
          </h1>

          <p className="text-sm text-slate-500 uppercase tracking-widest mt-1">
            Pulse of the Feed
          </p>

        </div>

        <div className="flex flex-col gap-2 flex-1">

          <Link
            to="/me"
            className="flex items-center gap-4 bg-blue-600 text-white rounded-xl p-4 font-medium"
          >
            <span>⌂</span>
            <span>Home</span>
          </Link>

          <Link
            to="/create"
            className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition"
          >
            <span>＋</span>
            <span>Create</span>
          </Link>

          <a
            href="#"
            className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition"
          >
            <span>🔔</span>
            <span>Notifications</span>
          </a>

          <Link
            to="/profile"
            className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition"
          >
            <span>👤</span>
            <span>Profile</span>
          </Link>

        </div>

      </nav>


      {/* ================= TABLET TOP NAV ================= */}

      <header className="fixed top-0 left-0 w-full z-50 hidden md:flex lg:hidden justify-between items-center px-8 py-3 bg-white/80 backdrop-blur-md shadow-sm">

        <h1 className="text-3xl font-bold text-blue-700">
          SnapFeed
        </h1>

        <div className="flex gap-5 text-blue-700">
          <button>🔔</button>
          <button>👤</button>
        </div>

      </header>


      {/* ================= MAIN CONTENT ================= */}

      <main className="lg:pl-64 md:pt-16 lg:pt-0 min-h-screen pb-24 md:pb-0">

        <div className="max-w-7xl mx-auto p-4 md:p-12 lg:p-8">

          <div className="flex flex-col md:flex-row gap-4 lg:gap-6 lg:h-[calc(100vh-64px)]">


            {/* ================= IMAGE ================= */}

            <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow-lg relative group h-[512px] md:h-[calc(100vh-128px)] border border-slate-200">

              {image ? (
                <img
                  src={image}
                  alt={caption || "Post"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500">
                  No image
                </div>
              )}

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

              {/* Like Count */}
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition">

                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full">

                  <span className="text-red-500">
                    ♥
                  </span>

                  <span className="font-semibold">
                    {post.likes?.length ||
                      post.likeCount ||
                      0}
                  </span>

                </div>

              </div>

            </div>


            {/* ================= RIGHT PANEL ================= */}

            <div className="w-full md:w-[400px] lg:w-[480px] bg-white rounded-2xl shadow-lg flex flex-col border border-slate-200 h-[614px] md:h-[calc(100vh-128px)]">


              {/* ================= POST HEADER ================= */}

              <div className="p-4 border-b border-slate-200 flex items-center gap-3">

                {/* Avatar */}

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

                <div className="flex-1">

                  <h2 className="font-semibold">
                    @{username}
                  </h2>

                  <p className="text-xs text-slate-500">
                    {post.createdAt
                      ? new Date(
                          post.createdAt
                        ).toLocaleString()
                      : "Recently"}
                  </p>

                </div>

                <div className="relative">
                  <button
                    className="text-slate-400 hover:text-slate-700 text-xl"
                    onClick={() => setMenuOpen((prev) => !prev)}
                  >
                    ⋯
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 top-10 bg-white border border-slate-200 rounded-lg shadow-md z-10 min-w-[160px]">
                      {isOwner ? (
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50"
                          onClick={() => {
                            setMenuOpen(false);
                            handleDeletePost();
                          }}
                        >
                          Delete Post
                        </button>
                      ) : (
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                          onClick={() => {
                            setMenuOpen(false);
                            window.location.href = "/me";
                          }}
                        >
                          Open Feed
                        </button>
                      )}
                    </div>
                  )}
                </div>

              </div>


              {/* ================= CAPTION ================= */}

              <div className="p-4 pb-2">

                <p className="text-sm leading-6">
                  {caption}
                </p>

                {/* Tags */}

                {post.tags?.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">

                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}

                  </div>
                )}

              </div>


              {/* ================= COMMENTS ================= */}

              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

                {comments.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center">

                    <p className="text-sm text-slate-400">
                      No comments yet.
                    </p>

                  </div>
                ) : (
                  comments.map((item) => (
                    <Comment
                      key={item._id || item.id}
                      comment={item}
                      onDelete={handleDeleteComment}
                    />
                  ))
                )}

              </div>


              {/* ================= COMMENT INPUT ================= */}

              <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl">

                <form
                  onSubmit={handleComment}
                  className="flex items-center gap-3"
                >

                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                    👤
                  </div>

                  <div className="flex-1 relative">

                    <input
                      type="text"
                      value={comment}
                      onChange={(e) =>
                        setComment(e.target.value)
                      }
                      placeholder="Add a comment..."
                      disabled={commentLoading}
                      className="w-full bg-slate-100 border-none rounded-full py-2 pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    />

                    <button
                      type="submit"
                      disabled={
                        commentLoading ||
                        !comment.trim()
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-700 hover:text-blue-900 disabled:opacity-40"
                    >
                      {commentLoading ? "..." : "➤"}
                    </button>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </main>


      {/* ================= MOBILE BOTTOM NAV ================= */}

      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/90 backdrop-blur-xl shadow-lg rounded-t-xl h-16">

        <Link
          to="/me"
          className="flex flex-col items-center text-blue-700"
        >
          <span>⌂</span>
          <span className="text-[10px] mt-1">
            Home
          </span>
        </Link>

        <Link
          to="/create"
          className="flex flex-col items-center text-slate-500"
        >
          <span>＋</span>
          <span className="text-[10px] mt-1">
            Create
          </span>
        </Link>

        <a
          href="#"
          className="flex flex-col items-center text-slate-500"
        >
          <span>🔔</span>
          <span className="text-[10px] mt-1">
            Alerts
          </span>
        </a>

        <Link
          to="/profile"
          className="flex flex-col items-center text-slate-500"
        >
          <span>👤</span>
          <span className="text-[10px] mt-1">
            Profile
          </span>
        </Link>

      </nav>

    </div>
  );
};


// COMMENT COMPONENT

const Comment = ({ comment, onDelete }) => {

  const username =
    comment.user?.username ||
    comment.username ||
    "User";

  const profileImage =
    comment.user?.profileImage ||
    comment.profileImage;

  const text =
    comment.text ||
    comment.comment ||
    "";

  const commentId =
    comment._id ||
    comment.id;

  return (
    <div className="flex gap-3 group">

      {/* Avatar */}

      {profileImage ? (
        <img
          src={profileImage}
          alt={username}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
          {username.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Content */}

      <div className="flex-1">

        <div className="flex items-baseline gap-2">

          <span className="font-semibold text-sm">
            @{username}
          </span>

          <span className="text-xs text-slate-400">
            {comment.createdAt
              ? new Date(
                  comment.createdAt
                ).toLocaleString()
              : ""}
          </span>

        </div>

        <p className="text-sm text-slate-600 mt-1">
          {text}
        </p>

        <div className="flex items-center gap-4 mt-1">

          <button className="text-xs text-slate-400 hover:text-slate-700">
            Reply
          </button>

        </div>

      </div>

      {/* Delete */}

      <button
        onClick={() => onDelete(commentId)}
        className="text-xs text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition self-start"
        title="Delete comment"
      >
        🗑
      </button>

    </div>
  );
};

export default PostDetails;