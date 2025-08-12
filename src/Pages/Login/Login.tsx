import { useState } from "react";
// import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/auth/auth.store";

export const Login = () => {
//   const navigate = useNavigate();

//   console.log(navigate.name);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = useAuthStore((state) => state.loginUser);

  // const isAuthenticated = async (username: string, password: string) => {
  //   const response = await fetch("http://localhost:3001/api/auth", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username,
  //       password,
  //     }),
  //   });
  //   const resp = await response.json();
  //   return resp;
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(username, password);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};
