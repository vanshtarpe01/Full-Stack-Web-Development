import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        { withCredentials: true }
      );

      console.log(response.data);

      setMessage("Account created successfully!");

      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-12 font-sans">
      <div className="w-full max-w-[480px] mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-blue-700 mb-2">
            SnapFeed
          </h1>

          <p className="text-lg text-slate-600">
            Join the Pulse of the Feed
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-xl font-semibold text-slate-900 mb-6">
            Create an account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-600 mb-1"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                placeholder="janedoe99"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-slate-100 border-2 border-transparent px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-600 mb-1"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-slate-100 border-2 border-transparent px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-600 mb-1"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg bg-slate-100 border-2 border-transparent px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white"
              />
            </div>

            {/* Message */}
            {message && (
              <p className="text-sm text-center text-slate-600">
                {message}
              </p>
            )}

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-700 text-white py-3 font-semibold flex items-center justify-center gap-2 transition hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Sign Up"}

                {!loading && <span>→</span>}
              </button>
            </div>
          </form>

          {/* Login */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-700 font-semibold hover:underline"
              >
                Log in here
              </a>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Register;