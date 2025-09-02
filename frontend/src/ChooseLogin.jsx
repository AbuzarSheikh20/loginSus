import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaInstagram, FaPhone } from "react-icons/fa";

const ChooseLogin = () => {
  const navigate = useNavigate();

  const logins = [
    { name: "Google", icon: <FaGoogle className="text-red-500 text-4xl" /> },
    { name: "Facebook", icon: <FaFacebook className="text-blue-600 text-4xl" /> },
    { name: "Instagram", icon: <FaInstagram className="text-pink-500 text-4xl" /> },
    { name: "Phone", icon: <FaPhone className="text-green-500 text-4xl" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 flex flex-col items-center justify-center items-center p-6">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">
        Login with:
      </h1>
      <div className="grid grid-cols-2 gap-6">
        {logins.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(`/login?type=${item.name}`)}
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
