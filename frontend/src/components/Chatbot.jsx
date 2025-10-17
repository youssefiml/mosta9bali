import { useState, useEffect } from "react";
import { X, Trash2, Plus } from "lucide-react";

export default function ChatbotApp({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // 🔹 New state for bot typing

  // 🔹 Demo Q&A list
  const demoQA = [
    { q: "hello", a: "Hi there! 👋 Welcome to SmartGuidance — how can I assist you today?" },
    { q: "hi", a: "Hi there! 👋 Welcome to SmartGuidance — how can I assist you today?" },
    { q: "how are you", a: "I'm doing great, how can I help you on your academic learning journey!" },
    { q: "what can you do", a: "I can help you explore schools, find scholarships, read blogs, and join our community." },
    { q: "bye", a: "Goodbye! 👋 Hope to see you again soon on SmartGuidance." },
    { q: "what is smartguidance", a: "SmartGuidance is a platform that helps students find schools, scholarships, and educational resources." },
    { q: "how to find schools", a: "Go to the 'Schools' section to explore top universities and find your perfect match 🎓" },
    { q: "how to apply for scholarship", a: "Visit the 'Scholarships' page to discover funding opportunities and learn how to apply 💰" },
    { q: "where can i read blogs", a: "Check out our 'Blogs' section — it’s full of study tips, career advice, and success stories 📘" },
    { q: "how to join community", a: "You can join our student community by signing up and connecting with peers from around the world 🌍" },
    { q: "who created smartguidance", a: "SmartGuidance was created by Youssef Imlilss and his team of passionate developers 💻" },
    { q: "what is the goal of smartguidance", a: "Our goal is to empower students to achieve academic excellence through access to knowledge and opportunities 🚀" },
    { q: "can i create a profile", a: "Yes! You can create your personal profile to track your journey and connect with other students 👤" },
    { q: "how to start", a: "Click 'Get Started Today' on the homepage — it’s your first step toward academic success 🌟" },
  ];

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
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const lowerInput = input.toLowerCase();
    const match = demoQA.find((item) => lowerInput.includes(item.q));

    // 🔹 Show typing indicator
    setLoading(true);

    setTimeout(() => {
      const botReply = {
        from: "bot",
        text: match ? match.a : "I’m not sure how to answer that yet 😅 — but you can check our Blogs for more info!",
      };
      setMessages((prev) => [...prev, botReply]);
      setLoading(false);
    }, 1200); // simulate 1.2 sec delay
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
        <span className="font-semibold">SmartGuide 🤖</span>
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
            💬 Try asking: <br />
            <strong>"what is SmartGuidance"</strong><br />
            <strong>"how to apply for scholarship"</strong><br />
            <strong>"how to join community"</strong>
          </p>
        ) : (
          <>
            {messages.map((msg, i) => (
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
            ))}
            {/* 🔹 Typing Indicator */}
            {loading && (
              <div className="px-3 py-2 rounded-xl bg-gray-100 text-gray-500 text-sm w-fit animate-pulse">
                SmartGuide is typing<span className="animate-bounce">...</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input */}
      <div className="flex border-t border-gray-200">
        <input
          className="flex-1 p-2 outline-none text-sm"
          placeholder="Ask something..."
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
