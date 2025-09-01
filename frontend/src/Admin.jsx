import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Admin() {
  const [typed, setTyped] = useState([]);

  useEffect(() => {
    socket.on("showText", (data) => {
      setTyped((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div className="h-screen p-8 bg-black text-green-400 font-mono">
      <h1 className="text-2xl mb-4">Live Typing Feed</h1>
      <div className="space-y-2">
        {typed.map((t, i) => (
          <div key={i}>
            <strong>{t.field}:</strong> {t.value}
          </div>
        ))}
      </div>
    </div>
  );
}
