import { useState } from "react";

const Login = ({handleLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Form is Submitted");
        console.log("Email is ", email);
        console.log("Password is ", password);
        handleLogin(email, password);
        setEmail("");
        setPassword("");
    }
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
            <div className="w-full max-w-md rounded-2xl border border-emerald-600 bg-gray-800 p-10 shadow-lg">
                <h2 className="mb-8 text-center text-3xl font-bold text-white">
                    Login
                </h2>

                <form onSubmit={(e) => {
                    submitHandler(e);
                }}
                    className="flex flex-col gap-4">
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                        className="rounded-full border-2 border-emerald-600 bg-transparent px-5 py-4 text-lg text-white outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500"
                        type="email"
                        placeholder="Enter Email"
                    />

                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                        className="rounded-full border-2 border-emerald-600 bg-transparent px-5 py-4 text-lg text-white outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500"
                        type="password"
                        placeholder="Enter Password"
                    />

                    <button
                        type="submit"
                        className="mt-3 rounded-full bg-emerald-600 px-5 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-emerald-700 active:scale-95"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;