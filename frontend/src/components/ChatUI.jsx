import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const botWelcome = (
  <span>
    <span className="font-bold text-green-600">👩‍⚕️ Nutritionist:</span> <br />
    <span className="text-gray-700">
      Welcome! 🌱 I’m here to craft a diet plan just for you.
      <br />
      Please share your age, gender, height, weight, activity level, goals,
      allergies, and dietary preferences.
      <br />
      Let’s make your nutrition journey inspiring and delicious! 🥗✨
    </span>
  </span>
);

const ChatUI = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: botWelcome,
    },
  ]);
  const [input, setInput] = useState("");
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    try {
      const res = await fetch("http://127.0.0.1:8000/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      // Animated bot reply with emoji and highlights
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "bot",
          text: (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-bold text-green-600">👩‍⚕️ Nutritionist:</span>{" "}
              <br />
              <span className="text-gray-700">
                {data.reply ? (
                  <span>
                    {data.reply.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
                      part.startsWith("**") && part.endsWith("**") ? (
                        <span key={i} className="font-bold text-blue-600">
                          {part.slice(2, -2)}
                        </span>
                      ) : (
                        part
                      )
                    )}
                  </span>
                ) : (
                  "Sorry, I didn't get that."
                )}
              </span>
            </motion.span>
          ),
        },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "bot",
          text: (
            <span>
              <span className="font-bold text-red-600">⚠️ Error:</span> <br />
              <span className="text-gray-700">
                Unable to connect to the nutrition server. Please try again
                later.
              </span>
            </span>
          ),
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-white via-blue-50 to-green-100 rounded-xl shadow-2xl p-6 border border-blue-100">
      <div
        className="flex-1 overflow-y-auto mb-4"
        id="chat-window"
        ref={chatWindowRef}
      >
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`flex mb-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-5 py-3 rounded-2xl max-w-md whitespace-pre-line break-words shadow-lg text-base font-medium transition-all duration-300 ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none border-2 border-blue-300"
                    : "bg-gradient-to-r from-green-100 to-blue-100 text-gray-900 rounded-bl-none border-2 border-green-200"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <form className="flex items-center gap-2" onSubmit={handleSend}>
        <input
          type="text"
          className="flex-1 border-2 border-blue-300 rounded-xl px-4 py-3 focus:outline-none focus:ring focus:ring-green-200 text-lg"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow hover:scale-105 transition-transform"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatUI;
