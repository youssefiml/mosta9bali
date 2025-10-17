import { useState, useEffect } from "react";
import { X, Trash2, Plus } from "lucide-react";

export default function ChatbotApp({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Load messages from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("chatbotMessages") || "[]");
    setMessages(saved);
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const botReply = { from: "bot", text: "This is just a demo reply 😄" };

    setMessages([...messages, userMsg, botReply]);
    setInput("");
  };

  const newConversation = () => {
    if (window.confirm("Start a new conversation?")) {
      setMessages([]);
      localStorage.removeItem("chatbotMessages");
    }
  };

  const deleteConversation = () => {
    if (window.confirm("Delete all chat history permanently?")) {
      setMessages([]);
      localStorage.removeItem("chatbotMessages");
    }
  };

  return (
    <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-sky-500 text-white px-4 py-2 flex justify-between items-center">
        <span className="font-semibold">Chatbot</span>
        <div className="flex gap-2 items-center">
          <button onClick={newConversation} title="New chat" className="hover:text-gray-200">
            <Plus size={18} />
          </button>
          <button onClick={deleteConversation} title="Delete all" className="hover:text-gray-200">
            <Trash2 size={18} />
          </button>
          <button onClick={onClose} title="Close" className="hover:text-gray-200">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-10">
            No messages yet. Start a conversation 💬
          </p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`px-3 py-2 rounded-xl max-w-[80%] ${
                msg.from === "bot"
                  ? "bg-gray-100 text-gray-800 self-start"
                  : "bg-sky-500 text-white self-end ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="flex border-t border-gray-200">
        <input
          className="flex-1 p-2 outline-none text-sm"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-sky-500 text-white px-4 text-sm font-medium hover:bg-sky-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
