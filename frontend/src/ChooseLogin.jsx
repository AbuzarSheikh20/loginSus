import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaGoogle, FaFacebook, FaInstagram, FaPhone } from "react-icons/fa";

const ChooseLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Home se jo category aayi hai, usko read karo
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  const logins = [
    { name: "Google", icon: <FaGoogle className="text-red-500 text-4xl" /> },
    { name: "Facebook", icon: <FaFacebook className="text-blue-600 text-4xl" /> },
    { name: "Instagram", icon: <FaInstagram className="text-pink-500 text-4xl" /> },
    { name: "Snapchat", icon: <FaSnapchat className="text-green-500 text-4xl" /> },
  ];

  const handleClick = (name) => {
    // ✅ Redirect → /login with type & category
    navigate(`/login?type=${name}&category=${category}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">
        Login with:
      </h1>
      <div className="grid grid-cols-2 gap-6">
        {logins.map((item, i) => (
          <div
            key={i}
            onClick={() => handleClick(item.name)}
            className="flex flex-col items-center bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer hover:scale-105 transition"
          >
            {item.icon}
            <p className="mt-2 text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseLogin;
