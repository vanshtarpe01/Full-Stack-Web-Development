import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("posts");

  // ============================================
  // FETCH PROFILE
  // ============================================

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/user/profile`,
        { withCredentials: true }
      );

      console.log("Profile:", response.data);

      const profileData = response.data.profile?.user || response.data.user || response.data;
      const postsData = response.data.profile?.posts || response.data.posts || [];

      setProfile(profileData);
      setPosts(postsData);
    } catch (error) {
      console.error("Profile error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // FETCH USER POSTS
  // ============================================

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/user/profile`,
        { withCredentials: true }
      );

      console.log("Posts:", response.data);

      setPosts(
        response.data.profile?.posts ||
        response.data.posts ||
        []
      );

    } catch (error) {
      console.error("Posts error:", error);
    }
  };

  // ============================================
  // INITIAL LOAD
  // ============================================

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, []);

  // ============================================
  // DELETE POST
  // ============================================

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/post/${postId}`,
        { withCredentials: true }
      );

      setPosts((previousPosts) =>
        previousPosts.filter(
          (post) =>
            (post._id || post.id) !== postId
        )
      );

    } catch (error) {
      console.error("Delete post error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete post."
      );
    }
  };

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-slate-500">
            Loading profile...
          </p>

        </div>

      </div>
    );
  }

  // ============================================
  // ERROR
  // ============================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center">

        <div className="text-center">

          <p className="text-red-500 mb-4">
            {error}
          </p>

          <button
            onClick={() => {
              fetchProfile();
              fetchPosts();
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  // ============================================
  // PROFILE DATA
  // ============================================

  const username =
    profile?.username ||
    "alex_creates";

  const name =
    profile?.name ||
    profile?.fullName ||
    "Alex Morgan";

  const avatar =
    profile?.profileImage ||
    profile?.avatar ||
    "https://via.placeholder.com/300";

  const bio =
    profile?.bio ||
    "Digital artist & photographer 📸\nCapturing the vibrant pulse of city life.\n✨ New prints available 👇";

  const website =
    profile?.website ||
    "linktr.ee/alexcreates";

  const followers =
    profile?.followers?.length ||
    profile?.followersCount ||
    "12.5k";

  const following =
    profile?.following?.length ||
    profile?.followingCount ||
    840;

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-sans antialiased">

      {/* ================================================= */}
      {/* MOBILE TOP NAV */}
      {/* ================================================= */}

      <nav className="md:hidden fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-white/80 backdrop-blur-md shadow-sm">

        <div>

          <span className="text-2xl font-black tracking-tight text-blue-700">
            SnapFeed
          </span>

        </div>

        <div className="flex items-center gap-4 text-slate-600">

          <button
            onClick={() => navigate("/create")}
            className="hover:text-blue-600 transition"
          >
            <span className="material-symbols-outlined">
              add_box
            </span>
          </button>

          <button
            className="hover:text-blue-600 transition"
          >
            <span className="material-symbols-outlined">
              notifications
            </span>
          </button>

          <button
            className="text-blue-600"
          >
            <span className="material-symbols-outlined">
              account_circle
            </span>
          </button>

        </div>

      </nav>


      {/* ================================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ================================================= */}

      <nav className="fixed left-0 top-0 h-full z-40 p-6 w-64 hidden lg:flex flex-col border-r border-[#c2c6d6] bg-white shadow-md">

        {/* Logo */}

        <div className="mb-8">

          <h1 className="text-4xl font-extrabold text-blue-700 mb-1">
            SnapFeed
          </h1>

          <p className="text-xs uppercase tracking-wider text-slate-500">
            Pulse of the Feed
          </p>

        </div>


        {/* Navigation */}

        <div className="flex flex-col gap-2 flex-grow">

          {/* Home */}

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition text-left"
          >

            <span className="material-symbols-outlined">
              home
            </span>

            <span>
              Home
            </span>

          </button>


          {/* Create */}

          <button
            onClick={() => navigate("/create")}
            className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition text-left"
          >

            <span className="material-symbols-outlined">
              add_box
            </span>

            <span>
              Create
            </span>

          </button>


          {/* Notifications */}

          <button
            className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition text-left"
          >

            <span className="material-symbols-outlined">
              notifications
            </span>

            <span>
              Notifications
            </span>

          </button>


          {/* Profile */}

          <button
            className="flex items-center gap-4 bg-blue-600 text-white rounded-xl p-4 font-bold text-left"
          >

            <span className="material-symbols-outlined">
              person
            </span>

            <span>
              Profile
            </span>

          </button>

        </div>

      </nav>


      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main className="w-full max-w-[640px] mx-auto px-4 md:px-12 lg:pt-6 pt-20 pb-28 lg:pb-8 lg:ml-64 lg:max-w-[calc(100%-256px)]">

        <div className="max-w-[640px] mx-auto">


          {/* ================================================= */}
          {/* PROFILE HEADER */}
          {/* ================================================= */}

          <header className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-6 border-b border-slate-200">

            {/* Avatar */}

            <div className="relative flex-shrink-0">

              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-[2px] bg-gradient-to-tr from-blue-600 to-indigo-500">

                <img
                  src={avatar}
                  alt={username}
                  className="w-full h-full rounded-full object-cover border-4 border-[#faf8ff]"
                />

              </div>

            </div>


            {/* Profile Information */}

            <div className="flex flex-col items-center md:items-start flex-grow w-full">

              {/* Name + Actions */}

              <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-4">

                <div className="text-center md:text-left mb-2 md:mb-0">

                  <h2 className="text-2xl md:text-3xl font-bold">
                    {username}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {name}
                  </p>

                </div>


                {/* Actions */}

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      navigate("/edit-profile")
                    }
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-4 py-2 rounded-lg transition"
                  >
                    Edit Profile
                  </button>


                  <button
                    onClick={() =>
                      navigate("/settings")
                    }
                    className="text-slate-500 hover:text-blue-600 p-2 rounded-lg hover:bg-slate-100 transition"
                  >

                    <span className="material-symbols-outlined">
                      settings
                    </span>

                  </button>

                </div>

              </div>


              {/* ================================================= */}
              {/* STATS */}
              {/* ================================================= */}

              <div className="flex gap-8 mb-4 text-sm">

                <div className="text-center md:text-left">

                  <span className="font-bold">
                    {posts.length}
                  </span>

                  {" "}posts

                </div>


                <div className="text-center md:text-left">

                  <span className="font-bold">
                    {followers}
                  </span>

                  {" "}followers

                </div>


                <div className="text-center md:text-left">

                  <span className="font-bold">
                    {following}
                  </span>

                  {" "}following

                </div>

              </div>


              {/* ================================================= */}
              {/* BIO */}
              {/* ================================================= */}

              <div className="text-center md:text-left text-base leading-6">

                {bio
                  .split("\n")
                  .map((line, index) => (
                    <p key={index}>
                      {line}
                    </p>
                  ))}

                <a
                  href={
                    website.startsWith("http")
                      ? website
                      : `https://${website}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 font-bold hover:underline inline-block mt-1"
                >
                  {website}
                </a>

              </div>

            </div>

          </header>


          {/* ================================================= */}
          {/* TABS */}
          {/* ================================================= */}

          <div className="flex justify-center border-b border-slate-200 mb-6">

            {/* Posts */}

            <button
              onClick={() =>
                setActiveTab("posts")
              }
              className={`
                flex items-center gap-2 px-8 py-4
                border-b-2
                font-semibold
                text-sm
                uppercase
                tracking-wider
                transition
                ${
                  activeTab === "posts"
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }
              `}
            >

              <span className="material-symbols-outlined">
                grid_on
              </span>

              POSTS

            </button>


            {/* Saved */}

            <button
              onClick={() =>
                setActiveTab("saved")
              }
              className={`
                flex items-center gap-2 px-8 py-4
                border-b-2
                font-semibold
                text-sm
                uppercase
                tracking-wider
                transition
                ${
                  activeTab === "saved"
                    ? "border-blue-600 text-blue-700"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }
              `}
            >

              <span className="material-symbols-outlined">
                bookmark_border
              </span>

              SAVED

            </button>

          </div>


          {/* ================================================= */}
          {/* SAVED TAB */}
          {/* ================================================= */}

          {activeTab === "saved" && (

            <div className="py-16 text-center">

              <span className="material-symbols-outlined text-5xl text-slate-300">
                bookmark_border
              </span>

              <p className="mt-4 text-slate-500">
                Your saved posts will appear here.
              </p>

            </div>

          )}


          {/* POSTS GRID */}

          {activeTab === "posts" && (

            <>
              {posts.length === 0 ? (

                <div className="py-16 text-center">

                  <span className="material-symbols-outlined text-5xl text-slate-300">
                    photo_library
                  </span>

                  <p className="mt-4 text-slate-500">
                    No posts yet.
                  </p>

                  <button
                    onClick={() =>
                      navigate("/create")
                    }
                    className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold"
                  >
                    Create your first post
                  </button>

                </div>

              ) : (

                <div className="grid grid-cols-3 gap-1 md:gap-2">

                  {posts.map((post, index) => (

                    <ProfilePost
                      key={
                        post._id ||
                        post.id ||
                        index
                      }
                      post={post}
                      index={index}
                      onClick={() =>
                        navigate(
                          `/post/${
                            post._id ||
                            post.id
                          }`
                        )
                      }
                      onDelete={
                        handleDeletePost
                      }
                    />

                  ))}

                </div>

              )}

            </>

          )}

        </div>

      </main>


      {/* ================================================= */}
      {/* MOBILE BOTTOM NAV */}
      {/* ================================================= */}

      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/90 backdrop-blur-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">

        {/* Home */}

        <button
          onClick={() => navigate("/")}
          className="flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition"
        >

          <span className="material-symbols-outlined text-[28px]">
            home
          </span>

        </button>


        {/* Create */}

        <button
          onClick={() => navigate("/create")}
          className="flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition"
        >

          <span className="material-symbols-outlined text-[28px]">
            add_circle
          </span>

        </button>


        {/* Notifications */}

        <button
          className="flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition"
        >

          <span className="material-symbols-outlined text-[28px]">
            notifications
          </span>

        </button>


        {/* Profile */}

        <button
          className="flex flex-col items-center justify-center text-blue-600 scale-110"
        >

          <span className="material-symbols-outlined text-[28px]">
            person_outline
          </span>

        </button>

      </nav>

    </div>
  );
};


// ============================================================
// PROFILE POST
// ============================================================

const ProfilePost = ({
  post,
  index,
  onClick,
  onDelete,
}) => {

  const image =
    post.image ||
    post.imageUrl ||
    post.mediaUrl;

  const likes =
    post.likes?.length ||
    post.likeCount ||
    0;

  const comments =
    post.comments?.length ||
    post.commentCount ||
    0;

  return (

    <div
      onClick={onClick}
      className={`
        relative group
        aspect-square
        bg-slate-100
        rounded-sm
        overflow-hidden
        cursor-pointer
        ${
          index === 0
            ? "col-span-2 row-span-2"
            : ""
        }
      `}
    >

      {/* Image */}

      {image ? (

        <img
          src={image}
          alt={post.caption || "Post"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

      ) : (

        <div className="w-full h-full flex items-center justify-center text-slate-400">

          <span className="material-symbols-outlined text-4xl">
            image
          </span>

        </div>

      )}


      {/* Hover Overlay */}

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-5">

        {/* Likes */}

        <div className="flex items-center text-white font-bold gap-1">

          <span className="material-symbols-outlined filled">
            favorite
          </span>

          {likes}

        </div>


        {/* Comments */}

        <div className="flex items-center text-white font-bold gap-1">

          <span className="material-symbols-outlined">
            chat_bubble
          </span>

          {comments}

        </div>

      </div>


      {/* More Button */}

      <button
        onClick={(e) => {
          e.stopPropagation();

          onDelete(
            post._id ||
            post.id
          );
        }}
        className="absolute top-2 right-2 text-white/80 hover:text-white p-1 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition backdrop-blur-sm"
      >

        <span className="material-symbols-outlined">
          more_vert
        </span>

      </button>

    </div>

  );
};

export default Profile;