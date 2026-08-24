import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

const EditProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ============================================
  // GET CURRENT PROFILE
  // ============================================

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_URL}/user/profile`,
        { withCredentials: true }
      );

      const user =
        response.data.profile?.user ||
        response.data.user ||
        response.data;

      setProfile(user);

      setBio(user.bio || "");

      setPreviewImage(
        user.profileImage ||
        user.avatar ||
        ""
      );

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

  useEffect(() => {
    fetchProfile();
  }, []);

  // ============================================
  // IMAGE CHANGE
  // ============================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    setProfileImage(file);

    // Preview
    const imageUrl = URL.createObjectURL(file);

    setPreviewImage(imageUrl);
  };

  // ============================================
  // SAVE PROFILE
  // ============================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bio.trim()) {
      alert("Bio cannot be empty.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const formData = new FormData();

      formData.append(
        "bio",
        bio.trim()
      );

      // Only send image if user selected
      if (profileImage) {
        formData.append(
          "profileImage",
          profileImage
        );
      }

      const response = await axios.put(
        `${API_URL}/user/profile`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(
        "Profile updated:",
        response.data
      );

      alert("Profile updated successfully!");

      navigate("/profile");

    } catch (error) {
      console.error(
        "Update profile error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to update profile."
      );

    } finally {
      setSaving(false);
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

  return (
    <div className="min-h-screen bg-[#faf8ff] text-slate-900">

      {/* ======================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ======================================= */}

      <nav className="fixed left-0 top-0 h-full z-40 p-6 w-64 hidden lg:flex flex-col border-r border-slate-200 bg-white shadow-md">

        <div className="mb-8">

          <h1 className="text-4xl font-extrabold text-blue-700">
            SnapFeed
          </h1>

          <p className="text-xs uppercase tracking-wider text-slate-500 mt-1">
            Pulse of the Feed
          </p>

        </div>

        <div className="flex flex-col gap-2 flex-1">

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition text-left"
          >
            <span className="material-symbols-outlined">
              home
            </span>

            Home
          </button>

          <button
            onClick={() => navigate("/create")}
            className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition text-left"
          >
            <span className="material-symbols-outlined">
              add_box
            </span>

            Create
          </button>

          <button
            className="flex items-center gap-4 text-slate-600 hover:bg-slate-100 rounded-xl p-4 transition text-left"
          >
            <span className="material-symbols-outlined">
              notifications
            </span>

            Notifications
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-4 bg-blue-600 text-white rounded-xl p-4 font-bold text-left"
          >
            <span className="material-symbols-outlined">
              person
            </span>

            Profile
          </button>

        </div>

      </nav>


      {/* ======================================= */}
      {/* MOBILE TOP BAR */}
      {/* ======================================= */}

      <header className="lg:hidden fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">

        <div className="flex items-center justify-between px-4 py-3">

          <button
            onClick={() => navigate("/profile")}
            className="text-slate-600"
          >
            <span className="material-symbols-outlined">
              arrow_back
            </span>
          </button>

          <h1 className="font-bold text-lg">
            Edit Profile
          </h1>

          <div className="w-6" />

        </div>

      </header>


      {/* ======================================= */}
      {/* MAIN */}
      {/* ======================================= */}

      <main className="lg:ml-64 min-h-screen flex justify-center px-4 pt-20 lg:pt-10 pb-24">

        <div className="w-full max-w-2xl">

          {/* Header */}

          <div className="hidden lg:flex items-center gap-4 mb-8">

            <button
              onClick={() => navigate("/profile")}
              className="p-2 rounded-full hover:bg-slate-100 transition"
            >
              <span className="material-symbols-outlined">
                arrow_back
              </span>
            </button>

            <h1 className="text-3xl font-bold">
              Edit Profile
            </h1>

          </div>


          {/* Card */}

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

            {/* ================================= */}
            {/* PROFILE IMAGE */}
            {/* ================================= */}

            <div className="p-6 md:p-8 border-b border-slate-200">

              <h2 className="text-lg font-semibold mb-5">
                Profile Picture
              </h2>

              <div className="flex flex-col items-center">

                {/* Image */}

                <div className="relative group">

                  <div className="w-32 h-32 rounded-full p-[3px] bg-gradient-to-tr from-blue-600 to-indigo-500">

                    <img
                      src={
                        previewImage ||
                        "https://via.placeholder.com/300"
                      }
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover border-4 border-white"
                    />

                  </div>

                  {/* Camera button */}

                  <label
                    htmlFor="profileImage"
                    className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer hover:bg-blue-700 transition shadow-lg"
                  >

                    <span className="material-symbols-outlined text-[20px]">
                      photo_camera
                    </span>

                  </label>

                </div>


                {/* File input */}

                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />


                <p className="text-sm text-slate-500 mt-4">
                  JPG, PNG or WEBP. Maximum 5MB.
                </p>


                {profileImage && (
                  <p className="text-sm text-blue-600 mt-2 font-medium">
                    New image selected
                  </p>
                )}

              </div>

            </div>


            {/* ================================= */}
            {/* BIO */}
            {/* ================================= */}

            <div className="p-6 md:p-8">

              <label
                htmlFor="bio"
                className="block text-lg font-semibold mb-3"
              >
                Bio
              </label>

              <textarea
                id="bio"
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
                maxLength={160}
                rows={5}
                placeholder="Tell people about yourself..."
                className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              <div className="flex justify-between mt-2">

                <p className="text-xs text-slate-400">
                  Tell people about yourself.
                </p>

                <span className="text-xs text-slate-500">
                  {bio.length}/160
                </span>

              </div>

            </div>


            {/* ================================= */}
            {/* ERROR */}
            {/* ================================= */}

            {error && (

              <div className="mx-6 md:mx-8 mb-6 p-3 rounded-lg bg-red-50 border border-red-200">

                <p className="text-sm text-red-600">
                  {error}
                </p>

              </div>

            )}


            {/* ================================= */}
            {/* ACTION BUTTONS */}
            {/* ================================= */}

            <div className="px-6 md:px-8 py-5 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">

              <button
                type="button"
                onClick={() =>
                  navigate("/profile")
                }
                disabled={saving}
                className="px-5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition disabled:opacity-50"
              >
                Cancel
              </button>


              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
              >

                {saving && (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}

                {saving
                  ? "Saving..."
                  : "Save Changes"}

              </button>

            </div>

          </div>

        </div>

      </main>


      {/* ======================================= */}
      {/* MOBILE BOTTOM NAV */}
      {/* ======================================= */}

      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/90 backdrop-blur-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">

        <button
          onClick={() => navigate("/")}
          className="text-slate-500"
        >
          <span className="material-symbols-outlined text-[28px]">
            home
          </span>
        </button>

        <button
          onClick={() => navigate("/create")}
          className="text-slate-500"
        >
          <span className="material-symbols-outlined text-[28px]">
            add_circle
          </span>
        </button>

        <button className="text-slate-500">
          <span className="material-symbols-outlined text-[28px]">
            notifications
          </span>
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="text-blue-600"
        >
          <span className="material-symbols-outlined text-[28px]">
            person
          </span>
        </button>

      </nav>

    </div>
  );
};

export default EditProfile;