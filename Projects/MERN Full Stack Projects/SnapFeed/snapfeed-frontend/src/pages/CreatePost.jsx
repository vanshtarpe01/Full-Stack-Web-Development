import { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Create Post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // FormData is required for image upload
      const formData = new FormData();

      formData.append("image", image);
      formData.append("caption", caption);

      const response = await axios.post(
        "http://localhost:3000/api/post/",
        formData, { withCredentials: true }
      );

      console.log(response.data);

      setMessage("Post created successfully!");

      // Reset form
      setImage(null);
      setPreview(null);
      setCaption("");
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Failed to create post."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">

      {/* Desktop Sidebar */}
      <nav className="fixed left-0 top-0 h-full z-40 p-6 w-64 hidden lg:flex flex-col border-r border-slate-200 bg-white shadow-md">

        <div className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-700">
            SnapFeed
          </h1>

          <p className="text-sm text-slate-500">
            Pulse of the Feed
          </p>
        </div>

        <ul className="flex flex-col gap-2 text-base flex-grow">

          <li>
            <a
              href="#"
              className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition"
            >
              <span>⌂</span>
              <span>Home</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center gap-4 bg-blue-600 text-white rounded-xl p-4 font-bold"
            >
              <span>＋</span>
              <span>Create</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition"
            >
              <span>🔔</span>
              <span>Notifications</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition"
            >
              <span>👤</span>
              <span>Profile</span>
            </a>
          </li>

        </ul>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen flex justify-center items-start p-4 md:p-12">

        <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg overflow-hidden">

          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">

            <h2 className="text-xl font-semibold">
              New Post
            </h2>

            <button
              type="button"
              className="text-slate-500 hover:text-blue-600 text-xl"
            >
              ×
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="flex flex-col md:flex-row">

              {/* Image Area */}
              <label
                htmlFor="image"
                className="w-full md:w-3/5 min-h-[400px] bg-slate-100 flex items-center justify-center relative overflow-hidden cursor-pointer group border-b md:border-b-0 md:border-r border-slate-200"
              >

                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500 group-hover:scale-105 transition">

                    <div className="text-6xl mb-2">
                      📷
                    </div>

                    <p className="text-base">
                      Drag photos or click to select
                    </p>

                  </div>
                )}

                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

              </label>

              {/* Details */}
              <div className="w-full md:w-2/5 p-6 flex flex-col">

                {/* User */}
                <div className="flex items-center gap-3 mb-4">

                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-[2px]">

                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      👤
                    </div>

                  </div>

                  <span className="font-semibold">
                    Alex Mercer
                  </span>

                </div>

                {/* Caption */}
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                  rows="6"
                  className="w-full resize-none border-0 bg-slate-100 rounded-lg p-4 text-base outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition mb-4"
                />

                {/* Message */}
                {message && (
                  <p className="text-sm text-center text-slate-600 mb-4">
                    {message}
                  </p>
                )}

                {/* Post Button */}
                <div className="flex gap-2 mt-auto">

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 px-4 rounded-lg font-semibold bg-blue-700 text-white shadow-sm hover:bg-blue-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Posting..." : "Post"}
                  </button>

                </div>

              </div>

            </div>

          </form>

        </div>

      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/90 backdrop-blur-xl rounded-t-xl shadow-lg">

        <a
          href="/me"
          className="flex flex-col items-center text-slate-500"
        >
          <span>⌂</span>
          <span className="text-xs">Home</span>
        </a>

        <a
          href="/"
          className="flex flex-col items-center text-blue-700 font-semibold"
        >
          <span>＋</span>
          <span className="text-xs">Create</span>
        </a>
        <a
          href="/profile"
          className="flex flex-col items-center text-slate-500"
        >
          <span>👤</span>
          <span className="text-xs">Profile</span>
        </a>

      </nav>

    </div>
  );
};

export default CreatePost;