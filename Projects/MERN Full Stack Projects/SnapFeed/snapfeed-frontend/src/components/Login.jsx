import React, { useState } from "react";

const Login = () => {
   const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange =  (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error when user starts correcting
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one number";
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    console.log("Login Data:", formData);

    // Axios API call here
     try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      formData
    );

    console.log(response.data);

    alert("Login successful!");

  } catch (error) {
    console.log(error);

    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert("Something went wrong");
    }
  }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8ff] p-4 md:p-12 antialiased relative overflow-hidden">

      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#e2e7ff]/40 blur-3xl" />

        <div className="absolute top-[60%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[#dae2fd]/30 blur-3xl" />
      </div>

      {/* Login Card */}
      <main className="relative z-10 w-full max-w-md">

        <div className="bg-white rounded-xl shadow-[0_10px_15px_-3px_rgba(15,23,42,0.08)] p-8 md:p-8 border border-white">

          {/* Brand Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0058be] mb-2">
              SnapFeed
            </h1>

            <p className="text-base text-[#424754]">
              Pulse of the Feed
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div className="space-y-2">

              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#131b2e]"
              >
                Email Address
              </label>

              <div className="relative">

                {/* Email Icon */}
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-[#727785]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l9 6 9-6"
                    />

                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />
                  </svg>
                </div>

                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  placeholder="you@example.com"
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-3
                    bg-[#F1F5F9]
                    border
                    border-transparent
                    rounded-lg
                    text-base
                    text-[#131b2e]
                    placeholder-[#727785]
                    transition-all
                    focus:outline-none
                    focus:border-[#0058be]
                    focus:ring-4
                    focus:ring-[#0058be]/20
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">

              <div className="flex items-center justify-between">

                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#131b2e]"
                >
                  Password
                </label>
              </div>

              <div className="relative">

                {/* Lock Icon */}
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-[#727785]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="10"
                      rx="2"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 10V7a4 4 0 018 0v3"
                    />
                  </svg>
                </div>

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="
                    w-full
                    pl-12
                    pr-12
                    py-3
                    bg-[#F1F5F9]
                    border
                    border-transparent
                    rounded-lg
                    text-base
                    text-[#131b2e]
                    placeholder-[#727785]
                    transition-all
                    focus:outline-none
                    focus:border-[#0058be]
                    focus:ring-4
                    focus:ring-[#0058be]/20
                  "
                />

                {/* Show Password */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#727785] hover:text-[#0058be]"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l18 18"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.58 10.58a2 2 0 002.84 2.84"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.88 4.24A10.94 10.94 0 0112 4c5 0 9 4 9 8a8.6 8.6 0 01-1.64 4.06"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.61 6.61C4.44 8.01 3 10.02 3 12c0 4 4 8 9 8 1.61 0 3.12-.39 4.45-1.08"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
                      />

                      <circle
                        cx="12"
                        cy="12"
                        r="2.5"
                      />
                    </svg>
                  )}
                </button>

              </div>
            </div>

            {/* Sign In */}
            <div className="pt-2">

              <button
                type="submit"
                className="
                  w-full
                  flex
                  justify-center
                  py-3.5
                  px-6
                  rounded-lg
                  text-sm
                  font-semibold
                  text-white
                  bg-[#0058be]
                  hover:bg-[#004395]
                  shadow-sm
                  hover:shadow-[0_8px_16px_-4px_rgba(0,88,190,0.3)]
                  transition-all
                  duration-200
                  active:scale-[0.98]
                "
              >
                Sign In
              </button>

            </div>

          </form>

          {/* Register */}
          <div className="mt-8 text-center">

            <p className="text-sm text-[#424754]">
              Don't have an account?

              <button
                type="button"
                className="ml-1 text-sm font-semibold text-[#0058be] hover:text-[#004395] transition-colors"
              >
                Register
              </button>
            </p>

          </div>

        </div>

      </main>
    </div>
  );
};

export default Login;