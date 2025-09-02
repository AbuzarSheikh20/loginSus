import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const options = [
    { title: "🎮 Play Fun Game", desc: "Relax with safe mini games." },
    { title: "🎥 Inspiring Videos", desc: "Watch positivity & motivation." },
    { title: "🌸 Beautiful Photos", desc: "Feel calm with a lovely gallery." },
    { title: "✨ Daily Quotes", desc: "Uplifting words for your day." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        💖 Welcome 💖
      </h1>
      <p className="text-gray-700 text-center mb-8">
        Choose something you’d love to explore 🌈
      </p>

      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {options.map((opt, i) => (
          <div
            key={i}
            onClick={() => navigate("/choose")}
            className="cursor-pointer bg-white rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-105 transform transition"
          >
            <h2 className="text-xl font-semibold text-purple-600">{opt.title}</h2>
            <p className="text-gray-500">{opt.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
